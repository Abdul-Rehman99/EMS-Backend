# EventHub: Event Booking Platform

**EventHub** is a full-stack MERN (MySQL, Express, React, Node.js) application designed for browsing, booking, and managing events. It features a clean, modern user interface, a complete booking system, and a separate admin panel for managing events, users, and viewing platform statistics.

## 📋 Complete Feature List


### 🧑‍💻 **User Features**

- 🎫 **Browse Events** — Search, filter by date/location, paginated results  
- 🔍 **Advanced Search** — Real-time search with collapsible filters  
- 📅 **Event Details** — Beautiful cards with all event information  
- 🎟️ **Book Tickets** — Select quantity, see total price before confirming  
- 📊 **My Bookings** — View all bookings with cancel functionality  
- ✅ **Booking Confirmation** — Instant feedback on successful bookings  

---

### 🛠️ **Admin Features**

- 📊 **Rich Dashboard** — Comprehensive stats with beautiful visualizations  
  - Total revenue, bookings, events, users  
  - Monthly performance metrics  
  - Average booking value  
  - Top 5 performing events  
  - Recent bookings feed  
- ➕ **Create Events** — Full event creation form with validation  
- ✏️ **Edit Events** — Update any event detail  
- 🗑️ **Delete Events** — Remove events with confirmation  
- 📈 **Revenue Analytics** — Track performance over time  

---

## 🔑 API Integration Details

All APIs are fully integrated and tested.

### 🔐 **Auth APIs**

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| ✅ POST | `/api/auth/register` | User registration |
| ✅ POST | `/api/auth/login` | User login |
| ✅ GET | `/api/auth/me` | Get current user (with token) |

### 🎫 **Event APIs**

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| ✅ GET | `/api/events` | List events (with pagination, search, filters) |
| ✅ GET | `/api/events/:id` | Get single event |
| ✅ POST | `/api/events` | Create event *(admin)* |
| ✅ PUT | `/api/events/:id` | Update event *(admin)* |
| ✅ DELETE | `/api/events/:id` | Delete event *(admin)* |

### 📅 **Booking APIs**

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| ✅ POST | `/api/bookings` | Create booking |
| ✅ GET | `/api/bookings` | Get user's bookings |
| ✅ DELETE | `/api/bookings/:id` | Cancel booking |

### 🧮 **Admin APIs**

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| ✅ GET | `/api/admin/stats` | Dashboard statistics |
| ✅ GET | `/api/admin/stats/revenue-chart` | Revenue trend data |

---

## 🎭 User Flows

### 👤 **Regular User Journey**

1. **Register/Login** → Beautiful authentication screen  
2. **Browse Events** → Search, filter, paginate through events  
3. **Book Event** → Select quantity, see total, confirm booking  
4. **View Bookings** → Manage all your bookings  
5. **Cancel Booking** → Easy cancellation with seat restoration  

### 🧑‍💼 **Admin Journey**

1. **Login** → Admin credentials  
2. **Dashboard** → View comprehensive analytics  
3. **Manage Events** → Create, edit, delete events  
4. **Monitor Performance** → Track top events and recent bookings  

---

## 🛠️ Tech Stack

* **Frontend:**
    * **React (v19)**
    * **Vite**
    * **Tailwind CSS**
    * **Framer Motion** (for animations)
    * **Lucide React** (for icons)
    * **React Hot Toast** (for notifications)

* **Backend:**
    * **Node.js**
    * **Express**
    * **Sequelize** (ORM for database)
    * **MySQL2** (Database driver)
    * **JSON Web Token (JWT)** (for authentication)
    * **Bcrypt** (for password hashing)
    * **Helmet** (for security headers)
    * **CORS** (Cross-Origin Resource Sharing)

* **Database:**
    * **MySQL**

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or later)
* npm or yarn
* A running MySQL database instance

### 1. Backend Setup (Server)

1.  **Navigate to the server directory:**
    ```sh
    cd server
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory by copying `.env.example`.
    ```env
    PORT=8080
    NODE_ENV=development
    
    # Your MySQL Database Config
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    
    # JWT Secret Key
    JWT_SECRET=a_very_strong_secret_key
    JWT_EXPIRES_IN=7d
    ```

4.  **Seed the database:**
    This will sync the models and create a default admin user and a sample event.
    ```sh
    npm run seed
    ```

5.  **Run the server:**
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:8080` (or your specified `PORT`).

### 2. Frontend Setup (Client)

1.  **Navigate to the client directory:**
    ```sh
    cd client
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `client` directory by copying `.env.example`.
    ```env
    VITE_API_URL=http://localhost:8080
    ```
    (Ensure this URL matches your backend server address).

4.  **Run the client:**
    ```sh
    npm run dev
    ```
    The React application will be running on `http://localhost:5173` (or another port if 5173 is busy).



## 📂 Project Structure

    eventhub/
    ├── client/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── modals/
    │   │   │   │   ├── BookingModal.jsx
    │   │   │   │   └── EventFormModal.jsx
    │   │   │   └── EventCard.jsx
    │   │   ├── context/
    │   │   │   └── AuthContext.jsx
    │   │   ├── pages/
    │   │   │   ├── admin/
    │   │   │   │   ├── AdminDashboard.jsx
    │   │   │   │   └── AdminEventsPage.jsx
    │   │   │   ├── AuthPage.jsx
    │   │   │   ├── EventDetailsPage.jsx
    │   │   │   ├── MyBookingsPage.jsx
    │   │   │   └── UserEventsPage.jsx
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   ├── .env.example
    │   ├── index.html
    │   ├── package.json
    │   └── vite.config.js
    │
    └── server/
        ├── config/
        │   └── db.js
        ├── controllers/
        │   ├── adminController.js
        │   ├── authController.js
        │   ├── bookingController.js
        │   └── eventController.js
        ├── middleware/
        │   ├── adminMiddleware.js
        │   ├── authMiddleware.js
        │   └── errorHandler.js
        ├── models/
        │   ├── Booking.js
        │   ├── Event.js
        │   ├── User.js
        │   └── index.js
        ├── routes/
        │   ├── adminRoutes.js
        │   ├── authRoutes.js
        │   ├── bookingRoutes.js
        │   └── eventRoutes.js
        ├── scripts/
        │   ├── generateDummyData.js
        │   └── seed.js
        ├── utils/
        │   └── generateToken.js
        ├── .env.example
        ├── package.json
        └── server.js