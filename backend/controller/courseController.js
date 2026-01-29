import Course from "../model/courseModel.js";
import  uploadOnCloudinary  from "../config/cloudinary.js";



export const createCourse = async (req, res) => {
    try {
        const { title, category} = req.body;
        if(!title || !category){
            return res.status(400).json({ success: false, message: "Title or Category is required" });
        }
        const course = await Course.create({ title, category, creator: req.userId });
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true });
        if(!courses){
            return res.status(404).json({ success: false, message: "No published courses found" });
        }
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId;
        const courses = await Course.find({ creator: userId });
        if(!courses){
            return res.status(404).json({ success: false, message: "No courses found" });
        }
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, subTitle, description, category, level, isPublished, price } = req.body;
        let thumbnail 
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path);
        }
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ success: false, message: "Courses not found" });
        }
        const updateData = {
            title,
            subTitle,
            description,
            category,
            level,
            isPublished,
            price,
            thumbnail
        }
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
        return res.status(200).json({ success: true, message: "Course updated successfully", course });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        course = await Course.findByIdAndDelete(courseId, {new: true});
        return res.status(200).json({ success: true, message: "Course deleted successfully", course });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}