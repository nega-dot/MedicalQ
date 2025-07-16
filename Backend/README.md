# MedicalQ Backend API 🏥

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Winston-000000?style=for-the-badge&logo=winston&logoColor=white" alt="Winston" />
</div>

<div align="center">
  <h3>🚀 RESTful API Server for Medical Consultations</h3>
  <p>A robust, scalable backend API serving the MedicalQ healthcare platform with authentication, doctor management, appointments, and community features.</p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Overview

The MedicalQ backend is a Node.js/Express.js API server that provides comprehensive healthcare platform functionality including user authentication, doctor management, appointment scheduling, community features, and secure messaging. Built with modern web technologies and designed for scalability and security.

### Key Capabilities
- **JWT Authentication**: Secure user authentication with Firebase integration
- **Role-Based Access Control**: Patient, Doctor, and Admin role management
- **Doctor Management**: Profile management, specialization, and availability
- **Appointment System**: Booking, scheduling, and management
- **Community Platform**: Health discussions and peer support
- **Secure Messaging**: Real-time communication between users
- **Medical Records**: Secure storage and retrieval of patient data

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with Firebase Auth integration
- Role-based access control (Patient, Doctor, Admin)
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and request throttling
- CORS configuration for secure cross-origin requests

### 👨‍⚕️ Doctor Management
- Doctor profile creation and management
- Credential verification system
- Specialty-based categorization
- Availability management
- Rating and review system
- Advanced search and filtering

### 📅 Appointment System
- Appointment booking and scheduling
- Calendar integration
- Automated reminders
- Status tracking (pending, confirmed, completed, cancelled)
- Conflict detection and resolution

### 🤝 Community Features
- Community post creation and management
- Comment and reply system
- Category-based organization
- Content moderation
- User interaction tracking

### 💬 Messaging System
- Real-time messaging between users
- Conversation management
- Message history and search
- File attachment support
- Message encryption

### 📊 Analytics & Logging
- Comprehensive request logging with Winston
- Performance monitoring
- Error tracking and reporting
- User activity analytics
- Health metrics and monitoring

---

## 🏗️ Architecture

### Project Structure
```
backend/
├── 📂 config/                    # Configuration files
│   └── 📄 firebase.js           # Firebase configuration
├── 📂 controllers/               # Business logic handlers
│   ├── 📄 authController.js     # Authentication logic
│   ├── 📄 doctorController.js   # Doctor management
│   ├── 📄 appointmentController.js # Appointment handling
│   ├── 📄 communityController.js # Community features
│   └── 📄 messageController.js  # Messaging system
├── 📂 middleware/                # Custom middleware functions
│   ├── 📄 auth.js              # Authentication middleware
│   ├── 📄 adminMiddleware.js   # Admin authorization
│   ├── 📄 error.js             # Error handling
│   ├── 📄 validation.js        # Input validation
│   └── 📄 rateLimiter.js       # Rate limiting
├── 📂 models/                   # Data models & schemas
│   ├── 📄 User.js              # User model
│   ├── 📄 DoctorProfile.js     # Doctor profile model
│   ├── 📄 PatientProfile.js    # Patient profile model
│   ├── 📄 Appointment.js       # Appointment model
│   ├── 📄 Message.js           # Message model
│   ├── 📄 CommunityPost.js     # Community post model
│   └── 📄 Credential.js        # Doctor credentials model
├── 📂 routes/                   # API route definitions
│   ├── 📄 authRoutes.js        # Authentication routes
│   ├── 📄 doctorRoutes.js      # Doctor management routes
│   ├── 📄 appointmentRoutes.js # Appointment routes
│   ├── 📄 communityRoutes.js   # Community routes
│   └── 📄 messageRoutes.js     # Messaging routes
├── 📂 utils/                    # Utility functions
│   ├── 📄 logger.js            # Winston logger setup
│   ├── 📄 helpers.js           # Helper functions
│   ├── 📄 validators.js        # Custom validators
│   └── 📄 constants.js         # Application constants
├── 📂 tests/                    # Test files
│   ├── 📂 unit/                # Unit tests
│   ├── 📂 integration/         # Integration tests
│   └── 📂 fixtures/            # Test data
├── 📂 logs/                     # Log files
├── 📄 app.js                    # Express app configuration
├── 📄 server.js                 # Server entry point
├── 📄 package.json              # Dependencies and scripts
├── 📄 .env.example              # Environment variables template
└── 📄 README.md                 # This file
```

### Technology Stack
- **Runtime**: Node.js 20+
- **Framework**: Express.js 4.18+
- **Database**: Firebase Firestore
- **Authentication**: JWT + Firebase Auth
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Joi, express-validator
- **Testing**: Jest, Supertest
- **Documentation**: Swagger/OpenAPI

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v20.0.0 or higher)
- npm (v10.0.0 or higher)
- Firebase project with Firestore enabled

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/abhinav-phi/MedicalQ.git
   cd MedicalQ/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure Environment Variables**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Firebase Configuration
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_SECRET=your_refresh_token_secret
   
   # Security Configuration
   CORS_ORIGIN=http://localhost:3000
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # Email Configuration (Optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Logging Configuration
   LOG_LEVEL=info
   LOG_FILE=logs/app.log
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run build        # Build for production

# Testing
npm test             # Run all tests
npm run test:unit    # Run unit tests
npm run test:integration # Run integration tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Database
npm run db:seed      # Seed database with test data
npm run db:reset     # Reset database
```

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe",
  "role": "patient",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "patient"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "+1234567890",
  "bio": "Updated bio"
}
```

### Doctor Management

#### Get All Doctors
```http
GET /api/doctors
Authorization: Bearer <jwt_token>
Query Parameters:
  - specialty: string (optional)
  - availability: boolean (optional)
  - limit: number (default: 10)
  - page: number (default: 1)
  - search: string (optional)
```

#### Get Doctor by ID
```http
GET /api/doctors/:doctorId
Authorization: Bearer <jwt_token>
```

#### Update Doctor Profile (Doctor only)
```http
PUT /api/doctors/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "specialization": "Cardiology",
  "experience": 10,
  "qualifications": ["MD", "MBBS"],
  "availability": {
    "monday": ["09:00", "17:00"],
    "tuesday": ["09:00", "17:00"]
  }
}
```

### Appointment Management

#### Book Appointment
```http
POST /api/appointments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "doctorId": "doctor_firebase_uid",
  "date": "2025-01-15",
  "time": "10:00",
  "reason": "General checkup",
  "duration": 30
}
```

#### Get User Appointments
```http
GET /api/appointments
Authorization: Bearer <jwt_token>
Query Parameters:
  - status: string (upcoming, completed, cancelled)
  - limit: number
  - page: number
```

#### Update Appointment Status
```http
PUT /api/appointments/:appointmentId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "Appointment confirmed"
}
```

### Community Platform

#### Get Community Posts
```http
GET /api/community/posts
Authorization: Bearer <jwt_token>
Query Parameters:
  - category: string
  - limit: number
  - page: number
  - search: string
```

#### Create Post
```http
POST /api/community/posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Health Question",
  "content": "Post content here",
  "category": "general",
  "tags": ["health", "advice"]
}
```

#### Comment on Post
```http
POST /api/community/posts/:postId/comments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "content": "Comment content"
}
```

### Messaging System

#### Send Message
```http
POST /api/messages
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "recipientId": "recipient_firebase_uid",
  "content": "Message content",
  "type": "text"
}
```

#### Get Conversations
```http
GET /api/messages/conversations
Authorization: Bearer <jwt_token>
```

#### Get Messages in Conversation
```http
GET /api/messages/conversations/:conversationId
Authorization: Bearer <jwt_token>
Query Parameters:
  - limit: number
  - page: number
```

### Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Security Configuration
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=logs/app.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5
```

### Firebase Configuration

```javascript
// config/firebase.js
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
```

### Express App Configuration

```javascript
// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use('/api/', limiter);

// General middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

module.exports = app;
```

---

## 🔒 Security

### Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');
const { auth } = require('../config/firebase');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await auth.getUser(decoded.uid);
    
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

module.exports = { authenticateToken };
```

### Input Validation

```javascript
// middleware/validation.js
const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).required(),
    role: Joi.string().valid('patient', 'doctor').required(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details[0].message
    });
  }
  
  next();
};

module.exports = { validateRegistration };
```

### Rate Limiting

```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later'
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many API requests, please try again later'
  }
});

module.exports = { authLimiter, apiLimiter };
```

---

## 🧪 Testing

### Test Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'middleware/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    'utils/**/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
```

### Unit Tests Example

```javascript
// tests/unit/authController.test.js
const request = require('supertest');
const app = require('../../app');

describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'patient'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
    });

    it('should return error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
        role: 'patient'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
```

### Integration Tests Example

```javascript
// tests/integration/api.test.js
const request = require('supertest');
const app = require('../../app');

describe('API Integration Tests', () => {
  let authToken;

  beforeAll(async () => {
    // Login and get auth token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    authToken = response.body.data.token;
  });

  describe('Protected Routes', () => {
    it('should require authentication', async () => {
      await request(app)
        .get('/api/auth/profile')
        .expect(401);
    });

    it('should allow access with valid token', async () => {
      await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/unit/authController.test.js

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 🚀 Deployment

### Production Environment Setup

1. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_production_jwt_secret
   FIREBASE_PROJECT_ID=your_production_project_id
   CORS_ORIGIN=https://medicalq.vercel.app
   ```

2. **Build and Start**
   ```bash
   npm run build
   npm start
   ```

### Deployment Options

#### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Create app
heroku create medicalq-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

#### Option 3: DigitalOcean App Platform
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set run command: `npm start`
4. Configure environment variables
5. Deploy

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

USER node

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t medicalq-backend .
docker run -p 5000:5000 medicalq-backend
```

---

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style Guidelines

- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Write unit tests for new features
- Update documentation as needed

### Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Firebase Connection Error
```
Error: Firebase Admin SDK not initialized
```
**Solution**: Verify Firebase service account key and environment variables

#### 2. JWT Token Issues
```
Error: JsonWebTokenError: invalid token
```
**Solution**: Check JWT_SECRET in environment variables and token format

#### 3. Database Connection Problems
```
Error: Firestore connection failed
```
**Solution**: Verify Firebase project ID and database rules

#### 4. CORS Issues
```
Error: Access-Control-Allow-Origin header missing
```
**Solution**: Check CORS_ORIGIN environment variable

### Debug Mode

```bash
# Enable debug logging
DEBUG=medicalq:* npm run dev

# View logs
tail -f logs/app.log
```

### Health Check Endpoint

```http
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00Z",
  "version": "1.0.0",
  "uptime": "2h 30m 45s"
}
```

---

## 📊 Monitoring & Analytics

### Logging Configuration

```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Performance Monitoring

```javascript
// middleware/performance.js
const performanceMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = performanceMiddleware;
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Firebase Team** - For comprehensive backend services
- **Express.js Community** - For the robust web framework
- **JWT.io** - For secure token implementation
- **Winston** - For excellent logging capabilities
- **Jest** - For testing framework

---

<div align="center">
  <p>
    Made with ❤️ by the MedicalQ Team<br>
    <a href="https://github.com/abhinav-phi">Abhinav Phi</a> • 
    <a href="https://github.com/AryanManu544">Aryan</a> • 
    <a href="https://github.com/debugaditya">Aditya</a>
  </p>
</div>

---

**Last Updated**: July 2025  
**Version**: 1.0.0  
**API Status**: Active Development
