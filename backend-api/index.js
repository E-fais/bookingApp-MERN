const express=require('express')
const mongoose=require('mongoose')
const User=require('./models/users.js')
require('dotenv').config()
const cors=require('cors')
const app=express()
const bcrypt=require('bcryptjs')
const bcryptSalt=bcrypt.genSaltSync(10) //creating a secret code to hide password
app.use(express.json()) //to parse json
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


app.listen(4000)

