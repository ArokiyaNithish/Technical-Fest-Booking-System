<div align="center">

# 🎪 Technical Fest Booking System

### *Full-Stack Event Ticket Booking Platform for College Technical Festivals*

[![React](https://img.shields.io/badge/React-19.2%2B-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3%2B-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-MSSQL-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)


> 🚀 **A complete full-stack web application** for managing technical festival event registrations — built with React 19, Node.js/Express, and Microsoft SQL Server — enabling students to browse events, book tickets, and allowing admins to manage all bookings in real time.

</div>

---

## 📋 Table of Contents

- [📌 Problem Statement](#-problem-statement)
- [💡 Solution & Approach](#-solution--approach)
- [🎯 Objectives](#-objectives)
- [🎭 Events & Features](#-events--features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🔬 How It Works — System Architecture](#-how-it-works--system-architecture)
- [🗄️ Database Schema](#️-database-schema)
- [🌐 API Endpoints](#-api-endpoints)
- [🚀 Installation & Setup](#-installation--setup)
- [💻 Usage Guide](#-usage-guide)
- [🔍 Code Analysis](#-code-analysis)
- [🌍 Impact & Real-World Significance](#-impact--real-world-significance)
- [🚀 Future Enhancements](#-future-enhancements)
- [🤝 Open Source Contribution](#-open-source-contribution)
- [📄 License](#-license)
- [👨‍💻 Author & Acknowledgments](#-author--acknowledgments)
- [📚 References](#-references)

---

## 📌 Problem Statement

> **"Managing technical festival event bookings manually is inefficient, error-prone, and results in poor student experience."**

### Background

College technical festivals host dozens of events across multiple departments, attracting hundreds of students. Manual ticket booking through spreadsheets, paper forms, or WhatsApp groups leads to:
- **Overbooking** — No real-time seat availability tracking
- **Data loss** — Participant details scattered across multiple files
- **No transparency** — Students have no way to know remaining seats
- **Admin overhead** — Coordinators manually track every registration

### The Core Problem

| Challenge | Description |
|-----------|-------------|
| 🔴 **No Centralized System** | Bookings are fragmented across departments with no single source of truth |
| 🔴 **Overbooking Risk** | Without real-time inventory control, events get overbooked causing chaos |
| 🔴 **Poor Student Experience** | Students don't know event details, prices, or seat availability upfront |
| 🔴 **No Admin Visibility** | Festival coordinators have no dashboard to monitor registrations |
| 🔴 **Manual Data Entry** | Hours spent consolidating participant data from forms and messages |

### Problem Statement (as given by Pratinik Infotech)

> *"Design and develop a full-stack web application for a college Technical Festival that enables students to browse events, view available seats, and complete ticket bookings online — while providing administrators with a centralized dashboard to monitor all registrations in real time."*

---

## 💡 Solution & Approach

### Our Strategy

We built a **full-stack MVC-based web application** that addresses each challenge systematically:

1. **Centralized Database → Microsoft SQL Server** (single source of truth for events & bookings)
2. **Real-Time Availability → SQL Transactions** (atomic updates prevent overbooking)
3. **Modern UI → React 19 + Vite** (fast, responsive single-page application)
4. **RESTful Backend → Node.js + Express** (clean API layer between frontend and database)
5. **Role-Based Access → Auth Context** (protected Admin Dashboard)

### Architecture Overview

```
[React Frontend — Port 5173]
         ↓ HTTP Requests
[Node.js/Express Backend — Port 5001]
         ↓ SQL Queries (mssql / msnodesqlv8)
[Microsoft SQL Server — TicketBookingDB]
         ↙              ↘
  [Events Table]    [Bookings Table]
  (availability)    (registrations)
```

### Booking Flow

```
Student visits site
       ↓
Browse Events (fetched live from DB)
       ↓
Select Event → View Details & Available Seats
       ↓
Fill Booking Form (Name, Email, Phone, College, Dept, Year, Tickets)
       ↓
Backend: SQL Transaction begins
  ├── Check available tickets
  ├── Deduct booked quantity from Events table
  └── Insert record into Bookings table
       ↓
Transaction committed → Booking Confirmed ✅
       ↓
Admin Dashboard shows updated records
```

---

## 🎯 Objectives

- ✅ **Browse all Technical Fest events** with live availability, pricing, venue & coordinator info
- ✅ **Book event tickets online** with participant details validated and stored in SQL Server
- ✅ **Prevent overbooking** using ACID-compliant SQL transactions
- ✅ **Admin login & dashboard** to view all booking records in a table
- ✅ **Real-time ticket deduction** — available seats update instantly after each booking
- ✅ **Responsive UI** — works across desktop and mobile screens

---

## 🎭 Events & Features

### Hosted Technical Events

| Event | Department | Date | Venue | Price | Seats |
|-------|-----------|------|-------|-------|-------|
| ⌨️ **Code-A-Thon** | Computer Science | Mar 15, 2026 – 10:00 AM | Main Computer Lab | ₹150 | 50 |
| 🤖 **Robo-Wars** | Mechanical Engineering | Mar 16, 2026 – 11:00 AM | Central Courtyard | ₹200 | 30 |
| 📄 **Paper Presentation** | Electronics & Communication | Mar 17, 2026 – 09:30 AM | Seminar Hall A | ₹100 | 60 |
| ⚡ **Circuit Design** | Electrical Engineering | Mar 15, 2026 – 02:00 PM | Electronics Lab 2 | ₹120 | 45 |
| 🧠 **Tech-Quiz** | Information Technology | Mar 16, 2026 – 02:00 PM | Auditorium | ₹50 | 100 |

### Application Pages

| Page | Route | Description |
|------|-------|-------------|
| 🏠 **Home** | `/` | Landing page with festival overview |
| ℹ️ **About** | `/about` | About the technical festival |
| 📅 **Events** | `/events` | Browse all events with event cards |
| 🎟️ **Booking** | `/book/:id` | Book tickets for a specific event |
| 🔐 **Login** | `/login` | Admin login page |
| 📊 **Admin Dashboard** | `/admin` | Protected dashboard showing all bookings |

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend Framework** | React | 19.2+ | UI component library |
| **Build Tool** | Vite | 7.3+ | Fast dev server & bundler |
| **Routing** | React Router DOM | 7.13+ | Client-side SPA routing |
| **State Management** | React Context API | — | Auth state management |
| **Backend Runtime** | Node.js | ≥18.0 | JavaScript server runtime |
| **Web Framework** | Express | 5.2+ | RESTful API server |
| **Database** | Microsoft SQL Server | — | Relational data storage |
| **DB Driver** | mssql + msnodesqlv8 | 12.2+ / 5.1+ | SQL Server connectivity |
| **Environment Vars** | dotenv | 17.3+ | Secure config management |
| **CORS** | cors | 2.8+ | Cross-origin request handling |
| **Dev Tool** | nodemon | 3.1+ | Auto-restart on file changes |
| **Styling** | Vanilla CSS | — | Custom styles & animations |

---

## 📦 Libraries & Dependencies

### Frontend (`ticket-booking/`)
```bash
npm install react react-dom react-router-dom
```

### Backend (`ticket-booking-server/`)
```bash
npm install express cors dotenv mssql msnodesqlv8 nodemon
```

---

## 📁 Project Structure

```
Technical-Fest-Booking-System/
│
├── 📁 ticket-booking/                  # React Frontend (Vite)
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── Home.jsx                # Landing page
│   │   │   ├── About.jsx               # About the festival
│   │   │   ├── Events.jsx              # Event listing page
│   │   │   ├── BookingPage.jsx         # Ticket booking form & summary
│   │   │   ├── Login.jsx               # Admin login page
│   │   │   └── AdminDashboard.jsx      # Protected admin booking table
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx              # Navigation bar
│   │   │   ├── EventCard.jsx           # Individual event display card
│   │   │   ├── EventDetails.jsx        # Detailed event info panel
│   │   │   ├── BookingForm.jsx         # Student registration form
│   │   │   └── BookingSummary.jsx      # Booking confirmation summary
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx         # Global auth state (isAdmin)
│   │   ├── 📁 data/                    # Static fallback data
│   │   ├── App.jsx                     # Root component with routing
│   │   ├── main.jsx                    # React entry point
│   │   ├── index.css                   # Global styles
│   │   └── App.css                     # App-level styles
│   ├── index.html                      # HTML entry point
│   ├── vite.config.js                  # Vite configuration
│   └── package.json                    # Frontend dependencies
│
├── 📁 ticket-booking-server/           # Node.js Backend (Express)
│   ├── 📁 controllers/
│   │   ├── bookingController.js        # GET all bookings, POST new booking
│   │   └── eventController.js          # GET all events
│   ├── 📁 routes/
│   │   └── bookingRoutes.js            # API route definitions
│   ├── 📁 db/
│   │   └── config.js                   # SQL Server connection pool
│   ├── server.js                       # Express app entry point
│   ├── database_setup.sql              # DB creation + seed script
│   ├── .env                            # DB credentials (not committed)
│   └── package.json                    # Backend dependencies
│
├── SQLFile1.sql                        # Initial DB/table creation script
├── Report (1).pdf                      # Full project report
└── README.md                           # This documentation
```

---

## 🔬 How It Works — System Architecture

### Step 1 — Database Setup (`database_setup.sql`)

```sql
-- Creates TicketBookingDB and two tables: Events and Bookings
CREATE TABLE Events (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Department NVARCHAR(100),
    DateTimeDisplay NVARCHAR(100),
    Venue NVARCHAR(200),
    Price INT NOT NULL,
    AvailableTickets INT NOT NULL,
    Description NVARCHAR(MAX),
    Coordinator NVARCHAR(100),
    Phone NVARCHAR(20)
);

CREATE TABLE Bookings (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    College NVARCHAR(200) NOT NULL,
    Dept NVARCHAR(100) NOT NULL,
    Year NVARCHAR(10) NOT NULL,
    EventName NVARCHAR(200) NOT NULL,
    NumTickets INT NOT NULL,
    TotalAmount INT NOT NULL,
    BookingDate DATETIME DEFAULT GETDATE()
);
```

**Why SQL Server?**
- ACID-compliant transactions prevent overbooking race conditions
- Robust stored data for admin auditing and reporting

---

### Step 2 — Backend Server (`server.js`)

```javascript
const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const { connectDB } = require('./db/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', bookingRoutes);

// Server starts first, DB connects in background
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
connectDB();
```

**Why start server before DB?** Ensures the API is immediately responsive, with DB connection established asynchronously.

---

### Step 3 — Fetching Events (`eventController.js`)

```javascript
const getEvents = async (req, res) => {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM Events');
    // Map DB column names to frontend-friendly field names
    const events = result.recordset.map(row => ({
        id: row.Id,
        name: row.Name,
        available: row.AvailableTickets,
        price: row.Price,
        // ...
    }));
    res.json(events);
};
```

---

### Step 4 — Creating a Booking with Transaction (`bookingController.js`)

```javascript
const createBooking = async (req, res) => {
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    // 1. Check ticket availability
    const available = eventResult.recordset[0].AvailableTickets;
    if (available < numTickets) throw new Error(`Only ${available} tickets available`);

    // 2. Deduct tickets from Events table
    await transaction.request()
        .input('numTickets', sql.Int, numTickets)
        .query('UPDATE Events SET AvailableTickets = AvailableTickets - @numTickets WHERE Name = @eventName');

    // 3. Insert booking record
    await transaction.request()
        .query(`INSERT INTO Bookings (...) VALUES (...)`);

    // Commit atomically — both changes succeed or both fail
    await transaction.commit();
    res.status(201).json({ message: 'Booking created successfully' });
};
```

**Why SQL Transactions?** Ensures both the ticket deduction and booking insertion succeed atomically — preventing phantom seats or orphaned bookings.

---

### Step 5 — React Frontend Routing (`App.jsx`)

```jsx
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/events"   element={<Events />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/admin"    element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

---

### Step 6 — Protected Admin Dashboard (`AdminDashboard.jsx`)

```jsx
const AdminDashboard = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) navigate('/login'); // Redirect if not authenticated
    }, [isAdmin]);

    // Fetches and displays all bookings in a table
    // Shows: Booking Time | Agent Name | Mission (Event) | Tickets | Total | Details
};
```

---

## 🗄️ Database Schema

### Events Table

| Column | Type | Description |
|--------|------|-------------|
| `Id` | INT (PK, Identity) | Auto-incremented event ID |
| `Name` | NVARCHAR(100) UNIQUE | Event name (e.g., "Code-A-Thon") |
| `Department` | NVARCHAR(100) | Hosting department |
| `DateTimeDisplay` | NVARCHAR(100) | Human-readable date & time |
| `Venue` | NVARCHAR(200) | Event location in college |
| `Price` | INT | Ticket price in ₹ |
| `AvailableTickets` | INT | Real-time remaining seats |
| `Description` | NVARCHAR(MAX) | Short event summary |
| `Details` | NVARCHAR(MAX) | Full event rules & details |
| `Coordinator` | NVARCHAR(100) | Event coordinator name |
| `Phone` | NVARCHAR(20) | Coordinator contact number |

### Bookings Table

| Column | Type | Description |
|--------|------|-------------|
| `Id` | INT (PK, Identity) | Auto-incremented booking ID |
| `UserName` | NVARCHAR(100) | Student's full name |
| `Email` | NVARCHAR(100) | Student email address |
| `Phone` | NVARCHAR(20) | Student phone number |
| `College` | NVARCHAR(200) | Student's college name |
| `Dept` | NVARCHAR(100) | Student's department |
| `Year` | NVARCHAR(10) | Academic year (e.g., "2nd Year") |
| `EventName` | NVARCHAR(200) | Name of booked event |
| `NumTickets` | INT | Number of tickets booked |
| `TotalAmount` | INT | Total cost (tickets × price) |
| `BookingDate` | DATETIME | Auto-set to current timestamp |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/events` | Fetch all events with live availability |
| `POST` | `/api` | Create a new booking (with SQL transaction) |
| `GET` | `/api/bookings` | Get all bookings (Admin only) |
| `GET` | `/api/status` | Server & database health check |

### Example: POST /api (Create Booking)

**Request Body:**
```json
{
  "name": "Arokiya Nithish",
  "email": "arokiyanithishj@gmail.com",
  "phone": "9876543210",
  "college": "XYZ Engineering College",
  "dept": "Computer Science",
  "year": "3rd Year",
  "eventName": "Code-A-Thon",
  "numTickets": 2,
  "totalAmount": 300
}
```

**Success Response (201):**
```json
{ "message": "Booking created successfully" }
```

**Error Response (500):**
```json
{ "error": "Only 1 ticket available" }
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm package manager
- Microsoft SQL Server (local or remote instance)
- SQL Server Management Studio (SSMS) — optional but recommended
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ArokiyaNithish/Technical-Fest-Booking-System.git
cd Technical-Fest-Booking-System
```

### 2. Setup the Database

1. Open **SSMS** (SQL Server Management Studio)
2. Run the `database_setup.sql` script — this creates:
   - `TicketBookingDB` database
   - `Events` and `Bookings` tables
   - Seeds all 5 technical events with sample data

```sql
-- Run in SSMS:
-- File → Open → database_setup.sql → Execute (F5)
```

### 3. Configure Backend Environment

Create a `.env` file in `ticket-booking-server/`:

```env
PORT=5001
DB_SERVER=YOUR_SQL_SERVER_INSTANCE
DB_DATABASE=TicketBookingDB
DB_TRUSTED_CONNECTION=true
```

> ⚠️ **Windows Authentication** is used by default via `msnodesqlv8`. Replace with SQL credentials if needed.

### 4. Install & Run the Backend

```bash
cd ticket-booking-server
npm install
npm run dev
```

Backend will start at: `http://localhost:5001`

Verify with: `http://localhost:5001/api/status`

### 5. Install & Run the Frontend

```bash
cd ticket-booking
npm install
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## 💻 Usage Guide

### 🎟️ Booking a Ticket (Student Flow)

```
1. Open http://localhost:5173
2. Click "Events" in the navigation bar
3. Browse available events — check seat availability
4. Click "Book Now" on any event
5. Fill in the booking form:
   - Full Name, Email, Phone
   - College Name, Department, Year
   - Number of Tickets
6. Click "Confirm Booking"
7. View booking confirmation summary ✅
```

### 🔐 Accessing Admin Dashboard

```
1. Click "Login" in the navigation bar
2. Enter admin credentials
3. You're redirected to /admin (protected route)
4. View all bookings in a table:
   - Booking Time | Student Name & Email
   - Event Name | Tickets | Total Amount
   - College, Dept, Phone details
5. Click "Logout" when done
```

### 🔧 Available npm Scripts

**Frontend:**
```bash
npm run dev      # Start development server (Vite HMR)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

**Backend:**
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start with node (production)
```

---

## 🔍 Code Analysis

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **SQL Transactions for booking** | Prevents race conditions — check, deduct, and insert are atomic |
| **React Context for Auth** | Lightweight global state management without Redux overhead |
| **Vite over CRA** | Significantly faster dev server startup and HMR (Hot Module Replacement) |
| **msnodesqlv8 driver** | Better Windows-native SQL Server connectivity using Windows Auth |
| **Server starts before DB** | API stays responsive even if DB takes time to connect |
| **Error Boundary in App.jsx** | Catches runtime errors gracefully, shows user-friendly crash page |
| **Field name mapping in eventController** | Transforms DB column names (PascalCase) to frontend-friendly camelCase |

### API Flow Diagram

```
React Frontend
     │
     ├── GET /api/events ──────────────► eventController.getEvents()
     │                                        └── SELECT * FROM Events
     │
     ├── POST /api ────────────────────► bookingController.createBooking()
     │       (booking data)                    ├── BEGIN TRANSACTION
     │                                         ├── Check AvailableTickets
     │                                         ├── UPDATE Events (deduct)
     │                                         ├── INSERT INTO Bookings
     │                                         └── COMMIT TRANSACTION
     │
     └── GET /api/bookings ────────────► bookingController.getBookings()
         (Admin only)                          └── SELECT * FROM Bookings
                                                   ORDER BY BookingDate DESC
```

### Component Dependency Map

```
App.jsx
  ├── AuthProvider (context/AuthContext.jsx)
  ├── Navbar.jsx
  ├── Home.jsx
  ├── About.jsx
  ├── Events.jsx
  │   └── EventCard.jsx
  ├── BookingPage.jsx
  │   ├── EventDetails.jsx
  │   ├── BookingForm.jsx
  │   └── BookingSummary.jsx
  ├── Login.jsx
  └── AdminDashboard.jsx
```

---

## 🌍 Impact & Real-World Significance

### Problem Solved

- 🎓 **For Students** — Browse events and book tickets online anytime, from any device
- 🎪 **For Coordinators** — No more manual registration; live data in the admin dashboard
- 🏫 **For Colleges** — Scalable system that can handle hundreds of bookings per fest

### System Advantages Over Manual Registration

| Manual Registration | This Web System |
|--------------------|--------------------|
| Paper forms or spreadsheets | **Online form with instant DB storage** |
| No seat count tracking | **Real-time available ticket count** |
| Overbooking possible | **SQL transactions prevent overbooking** |
| Data scattered across teams | **Centralized admin dashboard** |
| Manual fee calculation | **Auto-calculated total amount** |
| No confirmation for student | **Instant booking confirmation page** |

---

## Demo Video Prototype



https://github.com/user-attachments/assets/35a5693c-0e61-4d10-af5c-3eea09a89b8c


---

## 🚀 Future Enhancements

- [ ] **Payment Gateway Integration** — Razorpay/Stripe for online ticket payment
- [ ] **Email Confirmation** — Automated booking confirmation email with QR ticket
- [ ] **QR Code Scanning** — Event entry management via QR code validation
- [ ] **PDF Ticket Download** — Generate and download ticket as PDF
- [ ] **Event Registration Analytics** — Charts and graphs for admin (using Recharts/Chart.js)
- [ ] **Mobile App** — React Native companion app for students
- [ ] **JWT Authentication** — Proper token-based auth instead of basic context
- [ ] **Multi-Admin Support** — Role-based access for different event coordinators
- [ ] **Event Image Uploads** — Add banner images for each event
- [ ] **Cloud Deployment** — Deploy on Vercel (frontend) + Railway/Render (backend)

---

## 🤝 Open Source Contribution

We warmly welcome contributions from the open source community! Whether it's **bug fixes**, **new features**, **UI improvements**, or **documentation** — every contribution helps!

### How to Contribute

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Technical-Fest-Booking-System.git
cd Technical-Fest-Booking-System

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make changes and commit
git add .
git commit -m "feat: add QR code ticket generation"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub → main branch
```

### Contribution Areas

| Area | Good First Issue? | Description |
|------|------------------|-------------|
| 🐛 **Bug Fixes** | ✅ Yes | Fix edge cases in booking validation |
| 🎨 **UI Improvement** | ✅ Yes | Enhance event cards, add animations |
| 📧 **Email Notifications** | ✅ Yes | Send booking confirmation emails |
| 🔐 **JWT Auth** | ⚡ Medium | Replace context-based auth with JWT tokens |
| 📊 **Analytics Dashboard** | ⚡ Medium | Add booking charts and event statistics |
| 📱 **Responsive Design** | ✅ Yes | Improve mobile layout across all pages |
| 🧪 **Unit Tests** | ⚡ Medium | Add Jest/Vitest test cases for components |
| ☁️ **Cloud Deployment** | ⚡ Medium | Dockerfile + deployment scripts |
| 💳 **Payment Integration** | 🔥 Advanced | Razorpay/Stripe payment gateway |

### Coding Standards

- Follow **ESLint** rules defined in `eslint.config.js`
- Use **functional React components** with hooks
- Write **meaningful commit messages** (use [Conventional Commits](https://www.conventionalcommits.org/))
- Test your changes locally before submitting PR
- Reference any issue number in your PR description

### Reporting Issues

Please use [GitHub Issues](https://github.com/ArokiyaNithish/Technical-Fest-Booking-System/issues) to:
- 🐛 Report bugs
- 💡 Request features
- ❓ Ask questions

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute this code with attribution.

```
MIT License

Copyright (c) 2026 Arokiya Nithish J

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

See [LICENSE](LICENSE) for full details.

---

## 👨‍💻 Author & Acknowledgments

### Author

**Arokiya Nithish J**
- Role : Backend and Database Developer
- 💼 Domain: Full Stack Web Developement | Analysis | 
- 🎓 Collage Vel Tech University
- 📅 Year: 2026

**Contacts**
- GitHub: [@ArokiyaNithish](https://github.com/ArokiyaNithish)
- LinkedIn: [@Arokiya Nithish J](https://www.linkedin.com/in/arokiya-nithishj/)
- Email: arokiyanithishj@gmail.com
- Portfolio: [arokiyanithish.github.io/portfolio/](https://arokiyanithish.github.io/portfolio/)

### Acknowledgments

- ⚛️ **React Team** — For the powerful, modern UI library ecosystem
- ⚡ **Vite Team** — For the lightning-fast build toolchain
- 🟢 **Node.js & Express Community** — For the robust server-side JavaScript framework
- 🗄️ **Microsoft SQL Server Team** — For the enterprise-grade relational database

---

## 📚 References

1. [React 19 — Official Documentation](https://react.dev)
2. [Vite — Official Documentation](https://vitejs.dev)
3. [React Router DOM v7 — Documentation](https://reactrouter.com)
4. [Express.js — Official Documentation](https://expressjs.com)
5. [mssql npm package — SQL Server Driver](https://www.npmjs.com/package/mssql)
6. [Microsoft SQL Server — Documentation](https://learn.microsoft.com/sql/sql-server)
7. [Report: Technical Fest Booking System](https://drive.google.com/file/d/1ugzXGmW7SmYdzC7kCwcxQWftI9L8-bzN/view?usp=drive_link)

---

<div align="center">

For support, email arokiyanithishj@gmail.com or create an issue in the GitHub repository.

### 🌟 If this project helped you — please give it a ⭐ Star on GitHub!

**#ReactJS #NodeJS #SQLServer #FullStack #WebDevelopment #TicketBooking #TechnicalFest**

*Made with ❤️ and JavaScript by Arokiya Nithish*

</div>








