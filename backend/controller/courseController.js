import Course from "../model/courseModel.js";
import  uploadOnCloudinary  from "../config/cloudinary.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";



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
        const courses = await Course.find({ isPublished: true }).populate("lectures");
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
        const { title, subtitle, description, category, level, isPublished, price } = req.body;
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
            subtitle,
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

//for lecture

export const createLecture = async (req, res) => {
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;
        if(!lectureTitle || !courseId){
            return res.status(400).json({ success: false, message: "Lecture title is required" });
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json({lecture, course });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    if (req.file) {
      const vedioUrl = await uploadOnCloudinary(req.file.path);
      if (!vedioUrl) {
        return res.status(500).json({
          success: false,
          message: "Video upload failed",
        });
      }
      lecture.vedioUrl = vedioUrl;
    }

    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

   
    lecture.isPreviewFree = isPreviewFree === "true";

    await lecture.save();
    return res.status(200).json(lecture);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const removeLecture = async (req, res) => {
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({ success: false, message: "Lecture not found" });
        }
        await Course.updateOne({lectures: lectureId}, {$pull: {lectures: lectureId}})
        return res.status(200).json({message: "Lecture deleted successfully"});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

//get creator 

export const getCreatorById = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}