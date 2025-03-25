### **Clubhouse Messages App**

A simple messaging platform where members can post messages, and admins can manage them.

---

### **🚀 Features**

- Users can join as **members** using a passcode.
- **Members** can post messages.
- **Admins** can delete messages.
- JWT authentication for security.

---

### **🛠 Tech Stack**

- **Frontend:** React, Vite
- **Backend:** Node.js, Express, PostgreSQL
- **Auth:** JWT

---

### **📌 Setup**

1. Clone the repo:
   ```bash
   git clone https://github.com/Ozioma45/clubhouse_messaging_app.git
   cd clubhouse_messaging_app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up **.env** file (for backend):
   ```env
   JWT_SECRET=your_secret_key
   MEMBERSHIP_PASSCODE=your_member_passcode
   ADMIN_PASSCODE=your_admin_passcode
   PORT=5000
    DB_USER=datebase_user
    DB_HOST=localhost
    DB_NAME=database_name
    DB_PASSWORD=database_password
    DB_PORT=5432
   ```
4. Run the backend:
   ```bash
   npm start
   ```
5. Start the frontend:
   ```bash
   npm run dev
   ```

---

### **🎯 Usage**

- **Sign up & log in** to get a token.
- **Enter passcode** to become a member or admin.
- **Post messages** (members only).
- **Delete messages** (admins only).

---

### **📌 Notes**

- Changes **update instantly** without needing to log out.
- Uses `localStorage` to sync user roles.

---

### **📩 Contributions & Issues**

Feel free to fork, contribute, or report issues. 🚀
