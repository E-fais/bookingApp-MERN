import mongoose, { Schema } from 'mongoose';

const UserSchema= new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

export default mongoose.model('User',UserSchema);
