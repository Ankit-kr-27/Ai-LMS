import User from '../model/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import genToken  from '../config/token.js';    
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
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "signup error", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "user not found" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "login error", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        await res.cookie("token", null, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 0
        });
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: "logout error", error: error.message });
    }
}