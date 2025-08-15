# 🌍 Traviki Travel Blog App ✈️

## 🚀 Overview
Welcome to **Traviki**, a vibrant MERN stack travel blog web app that connects travel enthusiasts worldwide! 🌴 Share your adventures, explore others’ stories, and connect through real-time chats in an open community. Whether it’s tips on hidden gems, cost breakdowns, or local culture, Traviki is your go-to platform to inspire and plan your next journey! 🗺️

## ✨ Features
- **🔐 Secure Authentication**: Register, log in, and log out with ease.
- **📝 Blog Management**:
  - Create, update, and delete travel blogs with a rich text editor (powered by TinyMCE).
  - Share detailed travel experiences: destinations, travel routes, food, culture, costs, places to visit, and do’s/don’ts. ✍️
  - View a dedicated “My Blogs” page to manage your own posts. 📚
- **🌐 Community Engagement**:
  - Browse and read travel blogs from other adventurers. 🧳
  - Connect via real-time chat to ask questions or discuss travel plans (private chat history for each user). 💬
- **🖼️ Profile Customization**: Update your username, profile photo (with Cloudinary integration), and password.
- **📱 Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## 🛠️ Tech Stack
### Frontend
- **React** (v19.1.0): Dynamic and interactive UI. ⚛️
- **Redux Toolkit** (v2.8.2) & **React-Redux** (v9.2.0): State management for a smooth user experience. 🗃️
- **React Router DOM** (v7.7.1): Seamless navigation across pages. 🧭
- **Tailwind CSS** (v4.1.11) & **DaisyUI** (v5.0.50): Modern, responsive styling. 🎨
- **TinyMCE** (v6.2.1): Rich text editor for blog creation. 📝
- **Socket.IO Client** (v4.8.1): Real-time chat functionality. 💬
- **Axios** (v1.11.0): API requests made easy. 📡
- **React Hook Form** (v7.61.1): Efficient form handling. 📋
- **React Hot Toast** (v2.5.2): Sleek notifications. 🔔
- **Lucide React** (v0.535.0) & **React Icons** (v5.5.0): Beautiful icons for UI. ✨
- **Vite** (v6.3.5): Lightning-fast development and build tool. ⚡

### Backend
- **Node.js** & **Express.js** (v5.1.0): Robust server-side framework. 🖥️
- **MongoDB** & **Mongoose** (v8.16.5): Flexible NoSQL database for storing blogs, users, and chats. 🗄️
- **Socket.IO** (v4.8.1): Real-time communication for chat. 💬
- **bcryptjs** (v3.0.2): Secure password hashing. 🔒
- **JSON Web Tokens (JWT)** (v9.0.2): Token-based authentication. 🛡️
- **Cloudinary** (v2.7.0): Cloud-based image storage for profile photos and blog images. 📸
- **Validator** (v13.15.15): Input validation for secure data handling. ✅
- **Slugify** (v1.6.6): Clean, SEO-friendly URLs for blogs. 🔗
- **CORS** (v2.8.5) & **Cookie-Parser** (v1.4.7): Cross-origin requests and cookie management. 🍪
- **Dotenv** (v17.2.1): Environment variable management. ⚙️

### Deployment
- **Render**: Hosted at [https://traviki-travel-blog-app.onrender.com](https://traviki-travel-blog-app.onrender.com). 🌐

## 🛠️ Installation
Get Traviki running locally in a few simple steps! 🚀

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Prantik009/Traviki-travel-blog-app.git
   cd Traviki-travel-blog-app
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` folder:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PORT=5000
     ```
   - Replace placeholders with your MongoDB URI, JWT secret, and Cloudinary credentials.

4. **Run the Application**:
   - Start the backend:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```
   - Access the app at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend API). 🌐

## 📖 Usage
1. **Sign Up/Login**: Create an account or log in to unlock all features. 🔐
2. **Share Your Story**: Write and publish travel blogs with rich text and images. ✍️
3. **Explore Blogs**: Discover travel stories from the community. 🌍
4. **Chat with Travelers**: Connect in real-time to discuss travel tips. 💬
5. **Manage Profile**: Update your username, photo, or password. 🖼️
6. **View Your Blogs**: Check your posts on the “My Blogs” page and edit/delete as needed. 📚

## 🌐 Deployment
The app is live on Render:  
[https://traviki-travel-blog-app.onrender.com](https://traviki-travel-blog-app.onrender.com) 🎉

To deploy your own instance:
1. Push the code to a GitHub repository.
2. Connect to Render and configure environment variables.
3. Deploy the backend and frontend separately (or as a monorepo if preferred).

## 📸 Screenshots

![Home](frontend/public/screenshots/home.png)
![HomeZoom](frontend/public/screenshots/Home_zoom.png)
![singlepost](frontend/public/screenshots/singlepost.png)
![createPost](frontend/public/screenshots/createPost.png)
![chat](frontend/public/screenshots/chat.png)
![Register](frontend/public/screenshots/register.png)
![Profile](frontend/public/screenshots/profile.png)


## 🤝 Contributing
Love to have you onboard! 🚢
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request. 🎉

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
Reach out to [Prantik](https://github.com/Prantik009) or explore the live app at [Traviki](https://traviki-travel-blog-app.onrender.com). Let’s travel the world together! 🌎