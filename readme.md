# **Clubhouse Messaging App**

A simple messaging platform where members can post messages, and admins can manage them.

🔗 **Live Demo:** [Clubhouse Messaging App](https://clubhouse-messaging-app.vercel.app/)

---

## **🚀 Features**

✅ **User Roles:**

- Users can **sign up and log in**.
- Members can **post messages**.
- Admins can **delete messages**.

✅ **Authentication & Security:**

- JWT-based authentication.
- Role management using **passcodes**.

✅ **Fully Responsive UI**

- Optimized for **mobile & desktop**.

✅ **Database & Backend:**

- Uses **PostgreSQL** as the database.
- Backend built with **Node.js & Express**.

---

## **🛠 Tech Stack**

### **Frontend**

- React (Vite)
- React Router

### **Backend**

- Node.js
- Express
- PostgreSQL

### **Authentication**

- JWT (JSON Web Tokens)

---

## **📌 Installation & Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Ozioma45/clubhouse_messaging_app.git
cd clubhouse_messaging_app
```

### **2️⃣ Install Dependencies**

#### **Frontend**

```bash
cd frontend
npm install
```

#### **Backend**

```bash
cd backend
npm install
```

---

## **3️⃣ Setup Environment Variables**

### **Backend (`backend/.env`)**

Create a `.env` file in the `backend` folder and add:

```env
JWT_SECRET=your_secret_key
MEMBERSHIP_PASSCODE=your_member_passcode
ADMIN_PASSCODE=your_admin_passcode
PORT=5000

DB_USER=your_database_user
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
```

For **development**, use the **local database**.  
For **production**, update **DB_HOST** with your **Render/PostgreSQL URL**.

### **Frontend (`frontend/.env`)**

Create a `.env` file in the `frontend` folder and add:

```env
VITE_API_URL=http://localhost:5000/api  # Use this for local development
```

For **production**, update it with your deployed backend URL:

```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## **4️⃣ Run the Application**

### **Backend**

```bash
cd backend
npm start
```

### **Frontend**

```bash
cd frontend
npm run dev
```

---

## **🎯 Usage**

1️⃣ **Sign up & log in** to get a token.  
2️⃣ **Enter passcode** to become a member or admin.  
3️⃣ **Post messages** (members only).  
4️⃣ **Delete messages** (admins only).

---

## **📌 Deployment**

### **Frontend (Vercel)**

1. Go to [Vercel](https://vercel.com/) and create an account.
2. Link your GitHub repository.
3. Set **environment variables** in Vercel settings:
   - `VITE_API_URL=https://your-backend-url.com/api`
4. Deploy the frontend.

### **Backend (Render or Railway.app)**

1. Push the backend code to GitHub.
2. Deploy on [Render](https://render.com/) or [Railway](https://railway.app/).
3. Add **environment variables** in Render settings.
4. Update **frontend API URL** to match the deployed backend.

---

## **📩 Contributions & Issues**

- Feel free to fork this project and submit pull requests.
- If you find a bug or want to request a feature, open an issue.

🚀 **Happy Coding!** 🎉

---
