const express=require('express')
const mongoose=require('mongoose')
const User=require('./models/users.js')
const Place=require('./models/places.js')
require('dotenv').config()
const cors=require('cors') // hleps to connect react to express 
const app=express()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const cookieParser=require('cookie-parser')
const imageDownloader=require('image-downloader')
const multer=require('multer')
const filePath=require('path')
const fs=require("fs")

const bcryptSalt=bcrypt.genSaltSync(10) //creating a secret code to hide password
const jwtSecret='sjfsdjflsdkfjskldfjklsdjfkls' //a random string
app.use(express.json()) //to parse json
app.use(cookieParser()) //to grab token from cookies which is used to save user info
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials:true,
    origin:"http://127.0.0.1:5173"
}))
 mongoose.connect(process.env.MONGO_URL)


app.get('/test',(req,res)=>{
    res.json('test ok')
})
app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body
    try {
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
        res.json(userDoc) 
    } catch (error) {
        res.status(422).json(error)
    }
   
})

app.post('/login',async(req,res)=>{
    const {email,password} =req.body
    const userDoc=await User.findOne({email})
    if(userDoc){
        const passwordOK=bcrypt.compareSync(password,userDoc.password)
  if(passwordOK){
    jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
        if(err) throw err
        const{name,email,_id}=userDoc
        res.cookie('token',
                    token, { 
                    httpOnly: true, 
                    sameSite: 'none', 
                    secure: true }).json({name,email,_id})
    })
  }else{
      res.json('password is not ok')}
    }else{

        res.json('eamil not found')
    }
})
//route to store user info so that it does not desappear on refresh
app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    if(token){
        jwt.verify(token,jwtSecret,{},async(err,userDoc)=>{
            if(err) throw err;
            const {name,email,_id}=await User.findById(userDoc.id)
            res.json({name,email,_id})
        })
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})
app.post('/upload-by-link',async (req,res)=>{
const {link} =req.body
let newName=Date.now()+ '.jpg'
await imageDownloader.image({
    url:link,
    dest:__dirname+'/uploads/'+newName
})
res.json(newName)
})

//install multer
const photosMiddleware=multer({dest:'uploads/'})
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles=[]
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i]
        //add extension to file name
        const parts=originalname.split('.')
        const ext=parts[parts.length-1]
        const newPath=path+"."+ext
        fs.renameSync(path,newPath)
        uploadedFiles.push(filePath.basename(newPath))
       console.log(path)
    }
    res.json(uploadedFiles)
   
})
app.post('/places',(req,res)=>{
    const {token}=req.cookies
    const {
        title,adress,
        photosAdded,extraInfo,
        perks,maxGuests,checkIn,
        checkOut,description
    }=req.body
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err
        const placeDoc=await Place.create({
            owner:userData.id,
            title,adress,
            photos:photosAdded,extraInfo,
            perks,maxGuests,checkIn,
            checkOut,description
        })
        res.json(placeDoc)
    })
})

app.get('/places',(req,res)=>{
    const {token}=req.cookies
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        const {id}=userData
       res.json(await Place.find({owner:id}))
    })
})

app.get('/places/:id',async (req,res)=>{
    const {id}= req.params
    res.json(await Place.findById(id))
})

app.put('/places',async(req,res)=>{
    //need to verify owner
    const {token}=req.cookies
    const {id,
        title,adress,
        photosAdded,extraInfo,
        perks,maxGuests,checkIn,
        checkOut,description
    }=req.body
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw new err
        const placeDoc=await Place.findById(id)
        if(userData.id===placeDoc.owner.toString()){
            placeDoc.set({
                title,adress,
                photos:photosAdded,extraInfo,
                perks,maxGuests,checkIn,
                checkOut,description
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

app.listen(4000)

