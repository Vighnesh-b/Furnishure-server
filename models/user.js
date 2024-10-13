import mongoose from 'mongoose';
const {Schema}=mongoose
const userSchema=new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password: String
})

export const UserModel = mongoose.model('User', userSchema);

