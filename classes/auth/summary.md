# Auth Project Summary

## Overview

Full-stack authentication system with email verification, JWT dual-token strategy, password reset, and role-based access control. Built with Node.js/Express backend and React frontend.Frond

---

## Tech Stack

### Backend
- **Node.js + Express.js** (v5.2.1) — Web server and REST API
- **MongoDB + Mongoose** (v9.3.3) — Database and ODM
- **jsonwebtoken** (v9.0.3) — JWT access & refresh token generation
- **bcryptjs** (v3.0.3) — Password hashing
- **Joi** (v18.1.1) — Input validation (DTO pattern)
- **Nodemailer** (v8.0.4) — Transactional emails (Mailtrap)
- **cookie-parser** — Secure httpOnly cookie handling
- **cors** — CORS with origin whitelist
- **dotenv** — Environment variable management

### Frontend
- **React** (v19.2.0) — UI library
- **Vite** (v7.2.4) — Build tool and dev server
- **React Router DOM** (v7.10.1) — Client-side routing and protected routes
- **Axios** (v1.17.0) — HTTP client with base URL and headers config
- **Bootstrap 5 + React Bootstrap** — UI components
- **Sass** — CSS preprocessing

---

## Project Structure

```
auth/
├── backend/
│   ├── server.js                        # Entry point
│   └── src/
│       ├── app.js                       # Express app setup
│       ├── modules/
│       │   └── auth/
│       │       ├── auth.routes.js
│       │       ├── auth.controller.js
│       │       ├── auth.service.js
│       │       ├── auth.model.js
│       │       ├── auth.middleware.js
│       │       └── dto/
│       │           ├── register.dto.js
│       │           └── login.dto.js
│       └── common/
│           ├── config/
│           │   ├── db.js                # MongoDB connection
│           │   └── email.js             # Nodemailer config
│           ├── utils/
│           │   ├── jwt.utils.js
│           │   ├── api-response.js
│           │   └── api-error.js
│           ├── middleware/
│           │   └── validate.middleware.js
│           └── dto/
│               └── base.dto.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/
        │   ├── SignUp.jsx
        │   ├── SignIn.jsx
        │   ├── ForgotPassword.jsx
        │   ├── ResetPassword.jsx
        │   ├── Profile.jsx
        │   ├── Header.jsx
        │   └── LayoutPage.jsx
        └── services/
            ├── api.js           # Axios base config
            ├── authService.js   # Auth API methods
            └── tokenStore.js    # Token get/set/remove
```

---

## Features

### Authentication Flows
- **Register** — Validate input, hash password, send verification email
- **Email Verification** — Token-based, SHA-256 hashed before DB storage
- **Login** — Compare password with bcrypt, issue access + refresh tokens
- **Forgot Password** — Send reset link with time-expiring token
- **Reset Password** — Validate token, hash new password, save
- **Logout** — Clear refresh token from DB and cookie
- **Token Refresh** — Issue new access token from valid refresh token

### Security
- **Dual JWT Strategy** — Access token (15 min) + Refresh token (7 days)
- **HttpOnly Cookies** — Refresh token stored server-side, inaccessible to JS
- **Token Hashing** — Verification, reset, and refresh tokens hashed with SHA-256
- **Password Hashing** — bcryptjs pre-save hook on Mongoose schema
- **Secure Cookie Flag** — Cookies only sent over HTTPS
- **Field Selection** — Password, tokens excluded from DB queries by default

### Authorization
- **RBAC** — Three roles: `customer`, `seller`, `admin`
- **authorize() middleware** — Reusable role-check middleware on protected routes

### Validation & Error Handling
- **DTO Pattern** — BaseDto class using Joi for all input validation
- **validate.middleware.js** — Strips unknown fields, reports all errors at once
- **ApiError class** — Static methods: `badRequest`, `unauthorized`, `conflict`, `forbidden`, `notFound`
- **ApiResponse class** — Standardized success responses: `ok`, `created`, `noContent`

---

## API Endpoints

Base URL: `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| POST | `/register` | No | Register new user |
| GET | `/verify-email/:token` | No | Verify email address |
| POST | `/login` | No | Login, returns access + refresh token |
| POST | `/forgot-password` | No | Send password reset email |
| POST | `/reset-password?token=` | No | Reset password with token |
| POST | `/refresh` | No | Get new access token from refresh token |
| GET | `/profile` | Yes | Get authenticated user profile |
| POST | `/logout` | Yes | Logout and clear refresh token |
| GET | `/api/health` | No | Server health check |

---

## Database — MongoDB Atlas

### User Schema
| Field | Type | Notes |
|-------|------|-------|
| username | String | required, 3–30 chars |
| email | String | required, unique, email format |
| password | String | hashed, excluded from queries |
| role | String | enum: customer / seller / admin |
| isVerified | Boolean | default: false |
| verificationToken | String | SHA-256 hashed, excluded from queries |
| refreshToken | String | SHA-256 hashed, excluded from queries |
| passwordResetToken | String | SHA-256 hashed, excluded from queries |
| passwordResetExpires | Date | expiry for reset token |

---

## Architecture & Patterns

- **Layered Architecture** — Routes → Controller → Service → Model
- **DTO Pattern** — Joi-based validation objects per endpoint
- **Token Hashing Strategy** — Raw token sent in email/cookie, hashed version stored in DB
- **Middleware Chain** — validate → authenticate → authorize → controller
- **Standardized Response/Error** — All responses follow same JSON shape
- **Environment-Based Config** — All secrets in `.env`, never hardcoded

---

## Frontend Services

### TokenStore (`tokenStore.js`)
Manages tokens in memory/localStorage.
- Keys: `AccessKey`, `RefreshKey`, `Users`
- Methods: `get`, `set`, `remove`

### AuthService (`authService.js`)
Calls backend API and updates TokenStore.
- Methods: `register`, `login`, `logout`, `forgotPassword`, `resetPassword`, `refreshToken`, `getProfile`

### Axios Config (`api.js`)
- Sets `baseURL` to backend URL
- Attaches `Authorization: Bearer <token>` header on requests

---

## Resume Bullets

- Built a full-stack authentication system with JWT dual-token architecture, email verification, and secure password reset using Node.js, Express, and MongoDB
- Implemented Role-Based Access Control (RBAC) with reusable authorize middleware supporting customer, seller, and admin roles
- Applied DTO validation pattern using Joi with custom middleware that strips unknown fields and reports all errors simultaneously
- Secured tokens with SHA-256 hashing before DB storage and httpOnly cookies for refresh token management
- Integrated Nodemailer for transactional emails (verification + password reset) with time-expiring token links
- Built React frontend with protected routes, Axios service layer, and token store for access/refresh token lifecycle management
