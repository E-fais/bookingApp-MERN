const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,ref:'Place'}, //ref: used to reference to placesModel to obtain necessary details
    user:{type:mongoose.Schema.Types.ObjectId},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    price:Number
})

const BookingModel= mongoose.model('Booking',bookingSchema)
module.exports=BookingModel