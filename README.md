# 📦 Electronics E-commerce Website

This is a full-featured e-commerce web application for selling electronic products. It is built using Node.js, EJS, jQuery, and Bootstrap, and includes modern features such as real-time chat, order tracking, admin panel with authentication, and VNPay payment integration.

## 🚀 Features

🛍️ **User-side**
- 🔎 Product listing with *pagination*
- 🛒 Shopping cart functionality
- 🚚 Real-time order tracking
- 💳 VNPay payment integration
- 💬 Real-time chat with admin support
- 📩 Contact form that *automatically sends emails* to admin
- ⭐ Product reviews and rating system

🔐 **Admin-side**
- 🧑‍💼 Admin dashboard with *role-based access control*
- 🔐 Secure login and authentication system
- 📦 Order management
- 👥 User management
- 🛍️ Product management

## 🛠️ Tech Stack
- **Backend:** Node.js + Express.js
- **Templating:** EJS
- **Frontend:** jQuery, Bootstrap
- **Real-time Communication:** Socket.io
- **Authentication:** JWT
- **Payment Gateway:** VNPay
- **Database:** MySQL

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/nguyenhuyk18/websitebandientu.git
cd websitebandientu
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

- 📄 **Copy** the `.env.example` file to `.env`
- 📝 **Fill in** all required environment variables as instructed in the file

### 4️⃣ Run the app

```bash
npm run dev
```

### 5️⃣ Access the site

- 🛒 **Customer view:** [http://localhost:<YOUR_PORT>](http://localhost:<YOUR_PORT>/)
- 🛠️ **Admin area:** [http://localhost:<YOUR_PORT>/admin](http://localhost:<YOUR_PORT>/admin)

---

> 💡 **Tip:**  
> If you encounter errors, please check your `.env` file and make sure your database is running!