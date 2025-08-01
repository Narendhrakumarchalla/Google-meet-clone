import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name : {
        type : String, required : true
    },
    email : {
        type : String, required : true, unique : true
    },
    password : {
        type:String,
        required : true,
        minlength:6
    },
})


const User = new mongoose.model('user', userSchema)

export default User