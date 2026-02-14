# 🎓 Koursera — Course Selling Website

A full-stack course selling platform built as a **practice project**. The platform supports two roles — **Admin** (course creator) and **User** (course buyer) — each with dedicated dashboards, authentication, and protected routes.

> ⚠️ **Disclaimer:** This project was created purely for learning and practice purposes. It is not intended for production use.

---

## 🖥️ Live Test Credentials

You can use the following pre-registered accounts to explore the application:

| Role | Email | Password |
|-------|------------------------|------------|
| **Admin** | `kruxarth@gmail.com` | `12345678` |
| **User** | `vishakha@gmail.com` | `12345678` |

---

## 📸 Features

### 👤 User Side
- Sign up / Sign in with JWT authentication
- Browse all available courses
- View course details
- Purchase courses
- View purchased courses in dashboard
- Update profile (first name, last name)

### 🛠️ Admin Side
- Sign up / Sign in with separate JWT authentication
- Create new courses with image upload (via Cloudinary)
- Update existing courses (title, description, price, image)
- Delete courses
- View all courses created by the admin
- Update admin profile

### 🔐 Security
- Password hashing with **bcrypt**
- JWT-based authentication with separate secrets for admin & user
- Protected routes on both frontend and backend
- Custom middleware for admin and user authorization

---

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js v5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **Cloudinary** | Image upload & storage |
| **express-fileupload** | Handling file uploads |
| **bcrypt** | Password hashing |
| **jsonwebtoken (JWT)** | Authentication tokens |
| **Zod** | Input validation |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin resource sharing |
| **Nodemon** | Development hot-reloading |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **React Router DOM v7** | Client-side routing |
| **TanStack React Query** | Server state management & data fetching |
| **Axios** | HTTP client |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **Radix UI** | Accessible, unstyled UI primitives |
| **shadcn/ui** | Styled component library built on Radix |
| **Lucide React** | Icon library |
| **Motion (Framer Motion)** | Animations |
| **class-variance-authority** | Component variant management |
| **clsx + tailwind-merge** | Conditional class utilities |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React + Vite)              │
│                                                             │
│  Landing Page ─── Login/Signup ─── User Dashboard           │
│                                    ├── Browse Courses       │
│                                    ├── Purchased Courses    │
│                                    └── Settings             │
│                                                             │
│                                    Admin Dashboard          │
│                                    ├── Create/Edit Courses  │
│                                    ├── Manage Courses       │
│                                    └── Settings             │
│                                                             │
│  Axios (with interceptors) ──── JWT token in headers        │
└────────────────────────┬────────────────────────────────────┘
                         │  HTTP REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Express.js)                       │
│                                                             │
│  Routes ─────── Middleware (JWT verify) ─────── Controllers │
│  /user/*         userMiddleware                 UserCtrl    │
│  /admin/*        adminMiddleware                AdminCtrl   │
│  /course/*       (public)                       CourseCtrl  │
│                                                             │
│  File Upload ──── Cloudinary SDK ──── Image CDN             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Atlas                             │
│                                                             │
│  Collections:  users │ admins │ courses │ purchases         │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **Authentication** — User/Admin signs in → backend verifies credentials with bcrypt → JWT token issued → stored in `localStorage` → attached to every request via Axios interceptors.
2. **Course Creation** — Admin uploads course details + image → `express-fileupload` handles multipart data → image uploaded to **Cloudinary** → course document saved in MongoDB with Cloudinary URL.
3. **Course Purchase** — User browses courses (public endpoint) → clicks buy (protected endpoint) → purchase record created linking `userId` ↔ `courseId`.

---

## 📂 Project Structure

```
course-selling/
├── README.md
│
├── backend/
│   ├── index.js                    # Entry point — Express app, CORS, Cloudinary config, MongoDB connection
│   ├── package.json
│   ├── .env                        # Environment variables (MongoDB URI, JWT secrets, Cloudinary keys)
│   │
│   ├── config/
│   │   └── db.js                   # Mongoose schemas & models (User, Admin, Course, Purchase)
│   │
│   ├── controllers/
│   │   ├── adminController.js      # Admin signup, signin, CRUD courses, profile management
│   │   ├── userController.js       # User signup, signin, buy course, view purchases, profile
│   │   └── courseController.js     # Public course listing & course details
│   │
│   ├── middlewares/
│   │   ├── admin.js                # JWT verification middleware for admin routes
│   │   └── user.js                 # JWT verification middleware for user routes
│   │
│   └── routes/
│       ├── adminRoutes.js          # POST /admin/signup, /signin, /create | GET /admin/me, /courses | PUT /update/:courseId | DELETE /delete/:courseId
│       ├── userRoutes.js           # POST /user/signup, /signin, /buycourse/:courseId | GET /user/me, /purchases
│       └── courseRoutes.js         # GET /course/all, /course/:courseId (public)
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── App.jsx                 # React Router configuration (public, user-protected, admin-protected)
        ├── main.jsx                # App entry point
        │
        ├── api/
        │   ├── auth.api.js         # Auth API calls (login, signup)
        │   └── admin.api.js        # Admin API calls
        │
        ├── components/
        │   ├── login-form.jsx      # Login form component
        │   ├── signup-form.jsx     # Signup form component
        │   ├── app-sidebar.jsx     # User sidebar navigation
        │   ├── admin-sidebar.jsx   # Admin sidebar navigation
        │   ├── ProtectedRoute.jsx  # Route guard for user authentication
        │   ├── AdminProtectedRoute.jsx  # Route guard for admin authentication
        │   ├── ui/                 # shadcn/ui components (button, card, input, sidebar, etc.)
        │   └── animate-ui/        # Animated UI components
        │
        ├── hooks/
        │   ├── use-mobile.js       # Mobile detection hook
        │   └── use-controlled-state.jsx
        │
        ├── layouts/
        │   ├── AppLayout.jsx       # User dashboard layout with sidebar
        │   └── AdminLayout.jsx     # Admin dashboard layout with sidebar
        │
        ├── lib/
        │   ├── axios.js            # Axios instance for user API (with JWT interceptor)
        │   ├── adminAxios.js       # Axios instance for admin API (with JWT interceptor)
        │   ├── utils.js            # Utility functions (cn for classnames)
        │   └── get-strict-context.jsx
        │
        └── pages/
            ├── Landing.jsx         # Landing / home page
            ├── Login.jsx           # Login page
            ├── Signup.jsx          # Signup page
            ├── Dashboard.jsx       # User dashboard
            ├── Courses.jsx         # Course browsing page
            ├── Settings.jsx        # User settings page
            ├── AdminEndpoint.jsx   # Admin dashboard
            └── AdminSettings.jsx   # Admin settings page
```

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|---------------------|-------------------------------|
| GET | `/course/all` | Get all courses |
| GET | `/course/:courseId` | Get single course details |

### User Routes (`/user`)
| Method | Endpoint | Auth | Description |
|--------|-------------------------------|------|-------------------------------|
| POST | `/user/signup` | ❌ | Register a new user |
| POST | `/user/signin` | ❌ | Login user, returns JWT |
| GET | `/user/logout` | ❌ | Logout |
| GET | `/user/me` | ✅ | Get logged-in user profile |
| PUT | `/user/update` | ✅ | Update user profile |
| GET | `/user/purchases` | ✅ | Get purchased courses |
| POST | `/user/buycourse/:courseId` | ✅ | Purchase a course |

### Admin Routes (`/admin`)
| Method | Endpoint | Auth | Description |
|--------|--------------------------------|------|-------------------------------|
| POST | `/admin/signup` | ❌ | Register a new admin |
| POST | `/admin/signin` | ❌ | Login admin, returns JWT |
| POST | `/admin/logout` | ❌ | Logout |
| GET | `/admin/me` | ✅ | Get logged-in admin profile |
| PUT | `/admin/update` | ✅ | Update admin profile |
| GET | `/admin/courses` | ✅ | Get admin's created courses |
| POST | `/admin/create` | ✅ | Create a new course (multipart) |
| PUT | `/admin/update/:courseId` | ✅ | Update a course |
| DELETE | `/admin/delete/:courseId` | ✅ | Delete a course |

> **Auth** — Protected routes require a `token` header containing a valid JWT.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or above)
- **npm** or **yarn**
- **MongoDB Atlas** account (or a local MongoDB instance)
- **Cloudinary** account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/kruxarth/course-selling-website.git
cd course-selling-website
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_USER_PASSWORD=your_user_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend dev server:

```bash
npm run dev
```

The backend will run on `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend dev server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

### 4. Open in Browser

Navigate to `http://localhost:5173` — you should see the Koursera landing page!

---

## 🚢 Deploying on Vercel

Since we have a **separate frontend and backend**, you need to create **two Vercel projects** — one for each.

### Step 1: Deploy the Backend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo (`kruxarth/course-selling-website`)
3. Set the **Root Directory** to `backend`
4. Vercel will auto-detect it via `vercel.json` — no build command needed
5. Add the following **Environment Variables**:

   | Variable | Value |
   |---|---|
   | `MONGO_URL` | Your MongoDB Atlas connection string |
   | `JWT_USER_PASSWORD` | Your user JWT secret |
   | `JWT_ADMIN_PASSWORD` | Your admin JWT secret |
   | `FRONTEND_URL` | Your deployed frontend Vercel URL (add after frontend deploy) |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
   | `CLOUDINARY_API_KEY` | Your Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

6. Click **Deploy**
7. Note down the deployed backend URL (e.g., `https://your-backend.vercel.app`)

### Step 2: Deploy the Frontend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the **same GitHub repo** again
3. Set the **Root Directory** to `frontend`
4. Framework Preset should auto-detect **Vite**
5. Add the following **Environment Variable**:

   | Variable | Value |
   |---|---|
   | `VITE_API_URL` | Your deployed backend URL (e.g., `https://your-backend.vercel.app`) |

6. Click **Deploy**
7. Note down the deployed frontend URL

### Step 3: Update Backend CORS

After both are deployed, go back to your **backend Vercel project** → Settings → Environment Variables and update:

| Variable | Value |
|---|---|
| `FRONTEND_URL` | Your deployed frontend URL (e.g., `https://your-frontend.vercel.app`) |

Then **redeploy** the backend for the change to take effect.

> **⚠️ Important Notes for Vercel Deployment:**
> - Vercel serverless functions have a **max execution time of 10s** (free tier). Keep API responses fast.
> - File uploads via `express-fileupload` use `/tmp/` which is available in Vercel serverless functions but files are **ephemeral** — they are deleted after the function execution, which is fine since we upload to Cloudinary immediately.
> - Each Vercel project gets its own `.vercel.json` config already included in this repo.

---

## 🗄️ Database Models

### User
| Field | Type |
|-----------|--------|
| email | String (unique) |
| password | String (hashed) |
| firstName | String |
| lastName | String |

### Admin
| Field | Type |
|-----------|--------|
| email | String (unique) |
| password | String (hashed) |
| firstName | String |
| lastName | String |

### Course
| Field | Type |
|-------------|--------|
| title | String |
| description | String |
| price | Number |
| image | Object (`{ public_id, url }`) |
| creatorId | ObjectId → Admin |

### Purchase
| Field | Type |
|----------|--------|
| userId | ObjectId → User |
| courseId | ObjectId → Course |

---

## 🧠 What I Learned

- Building a full-stack MERN application from scratch
- JWT-based authentication with separate admin/user flows
- File upload handling with `express-fileupload` and **Cloudinary** integration
- Protected routes on both client and server side
- Using **React Router v7** with nested layouts and route guards
- Server state management with **TanStack React Query**
- Building responsive UIs with **Tailwind CSS v4** and **shadcn/ui**
- Axios interceptors for automatic token attachment
- MongoDB schema design with Mongoose references and population

---

## 📄 License

This project is open source and available for learning purposes.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/kruxarth">kruxarth</a> as a practice project.
</p>
