# 📚 Personal Book Manager

A full-stack Book Management application built with **Next.js 16**, **React 19**, **Express.js**, and **MongoDB**.

The application allows users to manage their personal book collection with authentication and CRUD functionality.

---

## 🌐 Live Demo

**Frontend:** https://personal-book-manager-one-sigma.vercel.app

## 🎨 Design Inspiration

The UI design is inspired by publicly available designs on **Dribbble**. The implementation, codebase, and application logic were developed independently for learning and portfolio purposes. Also, ChatGPT used to create this README.md and official docs for code references.

## ✨ Features

- User Authentication (JWT)
- Secure Password Hashing (bcrypt)
- Add Books
- Edit Books
- Delete Books
- Responsive UI
- Form Validation
- API Integration using Axios
- Global State Management with Redux Toolkit
- Server State Management using React Query

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS v4
- Redux Toolkit
- React Query
- React Hook Form
- Yup
- Axios
- Framer Motion
- Shadcn UI
- Sonner
- Lucide Icons

## Backend

- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Cookie Parser
- CORS
- dotenv

---

# Project Structure

```
book-manager/
│
├── client/
│
├── server/
│
├── README.md
├── LICENSE
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Amar7021/Personal-Book-Manager.git
```

## Install Frontend

```bash
cd client
npm install
```

## Install Backend

```bash
cd ../server
npm install
```

---

# Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=PORT_NO             // example port no: 5000
CORS_ORIGIN=http://example.com
MONGO_URI=mongo_db_atlas_string

ACCESS_TOKEN_SECRET=your string
ACCESS_TOKEN_EXPIRY=30d  // enter days or hours
```

---

# Running the Project

## Backend

```bash
cd server
npm run dev
```

## Frontend

```bash
cd client
npm run dev
```

---

# License

This project is licensed under the MIT License.
