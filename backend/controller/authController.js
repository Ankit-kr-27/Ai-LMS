import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { genToken } from '../utils/genToken.js';    
export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let existUser = await User.findOne({ email });
        if(existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });
        let token = await genToken(user._id);
        req.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "signup error", error: error.message });
    }
}