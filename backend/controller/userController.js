import User from "../model/userModel.js";
import  uploadOnCloudinary  from "../config/cloudinary.js";
import isAuth from "../middleware/isAuth.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { description, name } = req.body

    let photoUrl
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path)
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { description, name, ...(photoUrl && { photoUrl }) },
      { new: true }
    ).select("-password")

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
