import mongoose, { Schema } from 'mongoose';

const bookingSchema= new Schema({
    place:{type:mongoose.Schema.Types.ObjectId,ref:'Place'}, //ref: used to reference to placesModel to obtain necessary details
    user:{type:mongoose.Schema.Types.ObjectId},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    price:Number
})

export default mongoose.model('Booking',bookingSchema)
