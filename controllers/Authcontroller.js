import User from "../models/Usermodels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge=3*24*60*60*1000;

const createToken=(email, userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge});
}

const signup=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("All fields are required");
        }
        if(await User.findOne({email})){
            return res.status(400).send("User already exists");
        }
        const user=await User.create({email,password});
        res.cookie("jwt",createToken(email,user.id),{
            maxAge:maxAge,
            secure:true,
            sameSite:"none"
        })
        return res.status(201).json({
            user:{
                id:user.id,
                email:user.email,
                // firstName:user.firstName,
                // lastName:user.lastName,
                // image:user.image,
                profileSetup:user.profileSetup
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("All fields are required");
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send("User not found");
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).send("Incorrect Password");
        }
        res.cookie("jwt",createToken(email,user.id),{
            maxAge:maxAge,
            secure:true,
            sameSite:"none"
        })
        return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

const profile=async(req,res)=>{
    try {
        const userId = req.user.userId; // Extracted from token
        const user = await User.findById(userId).select('-password'); // Exclude password
        
        if (!user) {
            console.log("User not found boo");
            console.log(userId)
            console.log(req)
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        // console.log("dafds")
        const userId = req.user.userId;
        console.log("updatereq:",req.body)
        const { firstName, lastName, phone, bio, image} = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, 
            { firstName, lastName, phone, bio, profileImage: image }, 
            { new: true, select: "-password" }
        );

        if (!updatedUser) {
            console.log("User not found booo");
            return res.status(404).json({ message: "User not found boo" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default { signup, login, profile, updateProfile };


// export default {signup, login, profile};