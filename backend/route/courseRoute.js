import express from "express"
import { createCourse, getPublishedCourses,getCreatorCourses,editCourse,getCourseById, removeCourse,createLecture,getCourseLecture,editLecture,removeLecture, getCreatorById } from "../controller/courseController.js";
import  isAuth  from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { searchWithAi } from "../controller/searchController.js";

const courseRouter = express.Router();

//for courses
courseRouter.post("/create",isAuth, createCourse);
courseRouter.get("/getpublished", getPublishedCourses);
courseRouter.get("/getcreator",isAuth,getCreatorCourses);
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse);
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById);
courseRouter.delete("/remove/:courseId",isAuth,removeCourse);

//for lectures

courseRouter.post("/createlecture/:courseId",isAuth,upload.single("thumbnail"),createLecture)
courseRouter.get("/courselecture/:courseId",isAuth,getCourseLecture)
courseRouter.post("/editlecture/:lectureId",isAuth,upload.single("vedioUrl"),editLecture)
courseRouter.delete("/removelecture/:lectureId",isAuth,removeLecture)
courseRouter.post("/creator/",isAuth,getCreatorById)

//for search
courseRouter.post("/search",searchWithAi)

export default courseRouter;