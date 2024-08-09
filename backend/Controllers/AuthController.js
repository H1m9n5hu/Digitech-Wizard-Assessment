import { User } from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(409).json({message: "User is already exist.", success: false});
        }
        const newUser = new User({name, email, password});
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({message: "Sing Up successfully", success: true});
    } catch (err) {
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const errorMessage = "Authentication failed due to wrong email or password";
        if(!user) {
            return res.status(403).json({message: errorMessage, success: false});
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!isPasswordEqual) {
            return res.status(403).json({message: errorMessage, success: false});
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: '24h'}
        );
        res.status(200).json({
            message: "Login successfully", 
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

export { signup as SignUp, login as Login };