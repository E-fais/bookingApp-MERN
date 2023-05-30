import mongoose, { Schema } from 'mongoose';

const placeSchema= new Schema({
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
    price:Number
})

export default mongoose.model('Place',placeSchema);