# ClassSync 🎓

> **Empowering Education Through Technology**  
> A comprehensive Learning Management System (LMS) designed to bridge the gap between instructors and students with seamless course management, secure payments, and interactive learning tools.


[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://class-sync-y2ru.onrender.com/)

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-v14%2B-green.svg)
![React](https://img.shields.io/badge/react-v18%2B-blue.svg)


![ClassSync Home Preview](assets/home-preview.png)

## 📖 Project Overview

ClassSync is a robust, full-stack LMS platform that facilitates modern e-learning. It provides a unified interface for students to enroll in courses, track progress, and interact with content, while enabling instructors to manage curriculum, assessments, and student data efficiently. Built with scalability and user experience in mind, it leverages the latest web technologies to deliver a fast, secure, and engaging educational environment.

## ✨ Key Features

*   **🔐 Secure Authentication**: Robust user registration and login using JWT and HttpOnly cookies.
*   **📚 Course Management**: Comprehensive tools for instructors to create, update, and manage course content.
*   **💳 Integrated Payments**: Seamless checkout experience for course enrollment via Razorpay.
*   **☁️ Cloud Storage**: Efficient media handling for course videos and resources using Cloudinary.
*   **📧 Automated Notifications**: Email alerts for registration, password resets, and course updates via Nodemailer.
*   **💬 Interactive Reviews**: Student feedback system to rate and review courses.
*   **🎨 AI-Powered Insights**: (Upcoming) Google GenAI integration for personalized learning recommendations.
*   **📱 Responsive Design**: Fully optimized interface for learning on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **State Management**: Redux Toolkit
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios
*   **UI Components**: React Icons, React Toastify, Recharts

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose)
*   **Authentication**: JWT, BcryptJS
*   **Middleware**: Cookie-Parser, Multer, CDM (Cross-Origin Resource Sharing)

### DevOps & Tools
*   **Version Control**: Git
*   **Linting**: ESLint
*   **Deployment**: Render (Backend), Vercel/Netlify (Frontend - *Recommended*)

## 🏗️ System Architecture

The application follows a **Client-Server Architecture** with a RESTful API:

1.  **Client (Frontend)**: Handles user interaction, rendering UI components, and managing application state. It communicates with the backend via secure API calls.
2.  **Server (Backend)**: Processes requests, executes business logic, interacts with the database, and handles third-party integrations (Razorpay, Cloudinary, Nodemailer).
3.  **Database**: MongoDB stores user profiles, course data, enrollments, and reviews.

**High-Level Flow:**
`User Request` ➡️ `React Frontend` ➡️ `Express API` ➡️ `Controller Logic` ➡️ `database/Third-Party Service` ➡️ `Response`

## 🌐 Live Demo

Experience the platform here:  
🔗 https://class-sync-y2ru.onrender.com/

> The live deployment showcases the complete functionality of the system.


## 📡 API Overview

| Module | Base Route | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | User registration, login, logout, password reset |
| **User** | `/api/user` | Profile management, role updates |
| **Course** | `/api/course` | Create, read, update, delete courses |
| **Payment** | `/api/order` | Process payments and verify transactions |
| **Review** | `/api/review` | Add and retrieve course reviews |


| Dashboard | Course View |
| :---: | :---: |
| ![Dashboard Placeholer](assets/dashboard.png) | ![Course Placeholder](assets/courses.png) |

## 🔮 Future Enhancements

*   [ ] **Live Classes**: Integration with Zoom or WebRTC for real-time sessions.
*   [ ] **Gamification**: Badges and leaderboards to increase student engagement.
*   [ ] **Mobile App**: Native mobile application using React Native.
*   [ ] **Advanced Analytics**: Detailed reporting dashboards for instructors.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
