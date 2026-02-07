import Course from "../model/courseModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();


export const searchWithAi = async (req, res) => {
    try {
        const {input} = req.body;
        if(!input){
            return res.status(400).json({success: false, message: "Please provide input"});
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const promt = `You are an intelligent assistant for an LMS (Learning Management System).

A user will type any query describing what they want to learn.
Your task is to:
1. Understand the user's intent.
2. Return ONLY ONE most relevant keyword from the list below.
3. Do NOT explain anything.
4. Do NOT return multiple words.
5. Do NOT add punctuation or extra text.

Choose ONLY from this list:

- App Development
- Web Development
- AI/ML
- AI Tools
- Data Science
- Data Analytics
- Ethical Hacking
- Cyber Security
- Cloud Computing
- DevOps
- Blockchain
- UI/UX Design
- Programming Basics
- DSA
- MERN Stack
- Backend Development
- Frontend Development
- Mobile Development
- Others
- Beginner
- Intermediate
- Advanced

User query:
${input}`

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
           contents: promt,
        });

        const keyword = response.text

        const courses = await Course.find({
            isPublished: true,
            $or: [
                {title: {$regex: input, $options: "i"}},
                {subTitle: {$regex: input, $options: "i"}},
                {description: {$regex: input, $options: "i"}},
                {category: {$regex: input, $options: "i"}},
                {level: {$regex: input, $options: "i"}},
            ],
        });
        if(courses.length > 0){
            return res.status(200).json({success: true, courses});
        }
        else{
            const courses = await Course.find({
            isPublished: true,
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {subTitle: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
                {category: {$regex: keyword, $options: "i"}},
                {level: {$regex: keyword, $options: "i"}},
            ],
        });
        return res.status(200).json({success: true, courses});
        }

        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error", error: error.message});
    }
}