import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to,otp) =>{
     await transporter.sendMail({
    from:  process.env.USER_EMAIL,
    to: to,
    subject: "Reset your Password",
    html: `<P>your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</P>`, // HTML version of the message
  });
}

export default sendMail;