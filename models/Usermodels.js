import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    profileImage:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:false
    },
    bio:{
        type: String,
        required:false
    },
    profileSetup:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model('User',userSchema);
export default User;