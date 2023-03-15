const mongoose=require('mongoose')

const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, 
    title:String,
    adress:String,
    description:String,
    extraInfo:String,
    photos:[String],
    perks:[String],
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
})

const placeModel=mongoose.model('Place',placeSchema)
module.exports=(placeModel)