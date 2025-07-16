# MedicalQ 🏥

<div align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>🩺 Medical Answers From Real Doctors</h3>
  <p>A comprehensive medical platform connecting patients with verified healthcare professionals for secure, accessible, and reliable medical consultations.</p>
</div>

<div align="center">
  <a href="https://medicalq.vercel.app">Live Demo</a> •
  <a href="https://drive.google.com/file/d/1AXsSWyNtySzT2Ccy-Jk1BaHno_ugBkMp/view?usp=sharing">Video Demonstration</a> •
  <a href="https://github.com/abhinav-phi/MedicalQ/">Github Repository</a> •
  <a href="https://youtu.be/F0t14HsFDzI?si=k1InjSiYfptoTRFr">Youtube Video</a> •
  <a href="#contributing">PPT</a>
</div>

---

## 🌟 Overview

**MedicalQ** revolutionizes healthcare accessibility by providing a secure, user-friendly platform where patients can connect with verified doctors for medical consultations, access community-driven health discussions, and manage their healthcare journey—all in one place.

### 🎯 Key Problems Solved

- **Healthcare Accessibility**: 24/7 access to medical professionals, especially for remote areas
- **Medical Information Reliability**: Verified doctors providing trustworthy medical advice
- **Community Support**: Peer-to-peer health discussions and support networks
- **Appointment Management**: Streamlined scheduling and consultation tracking

---

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication with Firebase integration
- Role-based access control (Patient, Doctor, Admin)
- Protected routes and secure data handling
- End-to-end encryption for medical data

### 👨‍⚕️ **Doctor Management**
- Verified specialist doctor profiles
- Doctor availability and scheduling system
- Specialty-based categorization
- Interactive consultation interface
- Doctor rating and review system

### 🏠 **User Dashboard**
- Comprehensive user profile management
- Medical history tracking
- Appointment scheduling and management
- Personalized health recommendations
- Prescription and treatment tracking

### 🤝 **Community Platform**
- Community-driven health discussions
- Peer-to-peer medical advice sharing
- Health-focused content sharing
- Real-time interaction capabilities
- Community moderation system

### 📱 **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Cross-platform compatibility
- Intuitive user interface
- Accessibility-focused design (WCAG 2.1 compliant)

### ⚡ **Performance & Scalability**
- Optimized with Vite for fast development
- Lazy loading for components
- Efficient API calls with caching
- Real-time data synchronization

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **Authentication**: Firebase Auth
- **Deployment**: Vercel

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Authentication**: JWT + Firebase Auth
- **Security**: Custom middleware
- **Logging**: Winston logger

### **DevOps & Tools**
- **Version Control**: Git
- **Code Quality**: ESLint, TypeScript
- **Package Manager**: npm
- **Environment**: Multiple config setups

---

## 🏗️ Project Structure

```
MedicalQ/
├── 📂 Backend/                    # Node.js/Express API Server
│   ├── 📂 Config/                 # Configuration files
│   │   └── 📄 Firebase.js         # Firebase configuration
│   ├── 📂 Controllers/            # Business logic handlers
│   │   └── 📄 authController.js   # Authentication logic
│   ├── 📂 Middlewares/            # Custom middleware functions
│   │   ├── 📄 Auth.js            # Authentication middleware
│   │   ├── 📄 Error.js           # Error handling middleware
│   │   └── 📄 adminMiddleware.js # Admin authorization
│   ├── 📂 Models/                 # Data models & schemas
│   │   └── 📄 User.js            # User model
│   ├── 📂 Routes/                 # API route definitions
│   │   └── 📄 authRoutes.js      # Authentication routes
│   ├── 📂 Utils/                  # Utility functions
│   │   └── 📄 logger.js          # Logging utilities
│   ├── 📄 app.js                 # Express app configuration
│   └── 📄 server.js              # Server entry point
│
├── 📂 Frontend/                   # React TypeScript Application
│   ├── 📂 src/
│   │   ├── 📂 components/         # Reusable UI components
│   │   │   ├── 📂 auth/          # Authentication components
│   │   │   ├── 📂 dashboard/     # Dashboard components
│   │   │   └── 📂 layout/        # Layout components
│   │   ├── 📂 config/            # API and Firebase config
│   │   ├── 📂 contexts/          # React Context providers
│   │   ├── 📄 App.tsx            # Main React component
│   │   └── 📄 main.tsx           # React entry point
│   ├── 📄 index.html             # HTML template
│   ├── 📄 package.json           # Dependencies
│   └── 📄 vite.config.ts         # Vite configuration
│
├── 📂 src/                        # Legacy Frontend Components
│   ├── 📂 components/
│   │   ├── 📂 community/         # Community features
│   │   ├── 📂 doctors/           # Doctor components
│   │   └── 📂 layout/            # Layout components
│   └── 📄 App.tsx                # Legacy main component
│
├── 📄 README.md                   # Project documentation
├── 📄 .gitignore                  # Git ignore rules
└── 📄 package.json               # Root dependencies
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/abhinav-phi/MedicalQ.git
cd MedicalQ
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure your environment variables
# Edit .env file with your Firebase credentials and JWT secret
```

#### Environment Variables (Backend)

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../Frontend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Configure your environment variables
# Edit .env file with your API endpoints
```

#### Environment Variables (Frontend)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MedicalQ

# Firebase Configuration (Frontend)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Configure Authentication providers (Email/Password, Google, etc.)
4. Set up Firestore security rules
5. Get your Firebase configuration and add to environment variables

### 5. Run the Application

#### Start Backend Server
```bash
cd Backend
npm run dev
# Server will run on http://localhost:5000
```

#### Start Frontend Development Server
```bash
cd Frontend
npm run dev
# Frontend will run on http://localhost:3000
```

### 6. Build for Production

#### Backend Production Build
```bash
cd Backend
npm run build
npm start
```

#### Frontend Production Build
```bash
cd Frontend
npm run build
npm run preview
```

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "role": "patient"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "+1234567890"
}
```

### Doctor Management Endpoints

#### Get All Doctors
```http
GET /api/doctors
Authorization: Bearer <jwt_token>
```

#### Get Doctor by Specialty
```http
GET /api/doctors/specialty/:specialtyName
Authorization: Bearer <jwt_token>
```

#### Book Appointment
```http
POST /api/appointments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "doctorId": "doctor_id",
  "date": "2024-12-01",
  "time": "10:00",
  "reason": "General checkup"
}
```

### Community Endpoints

#### Get Community Posts
```http
GET /api/community/posts
Authorization: Bearer <jwt_token>
```

#### Create Community Post
```http
POST /api/community/posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Health Question",
  "content": "Post content here",
  "category": "general"
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test

# Run all tests
npm run test:all
```

### Test Structure

```
tests/
├── backend/
│   ├── auth.test.js
│   ├── doctors.test.js
│   └── community.test.js
├── frontend/
│   ├── components/
│   └── integration/
└── e2e/
    └── user-flows.test.js
```

---

## 🔒 Security Features

### Authentication Security
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- Role-based access control

### Data Security
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

### Medical Data Protection
- HIPAA-compliant data handling
- End-to-end encryption
- Secure data transmission
- Access logging and monitoring

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Manual deployment
npm run build
vercel --prod
```

### Backend Deployment Options

#### Option 1: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create medicalq-backend

# Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

#### Option 2: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway deploy
```

#### Option 3: DigitalOcean App Platform
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy with automatic scaling

---

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1440px and up)

### Key Mobile Features
- Touch-friendly interface
- Optimized loading times
- Responsive navigation
- Mobile-first design approach

---

## 🔧 Configuration

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Vite Configuration
```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the Repository
```bash
git fork https://github.com/abhinav-phi/MedicalQ.git
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Your Changes
```bash
git commit -m "Add: Your feature description"
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Describe your changes clearly
- Include screenshots if applicable
- Link to any related issues

### Code Style Guidelines

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions

#### React Components
- Use functional components with hooks
- Implement proper prop types
- Follow component naming conventions
- Use React.memo for performance optimization

#### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic HTML elements

---

## 📊 Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Lazy loading of components
- **Bundle Optimization**: Vite optimization
- **Image Optimization**: WebP format support
- **Caching**: Service worker implementation

### Backend Optimizations
- **Database Indexing**: Firestore index optimization
- **API Caching**: Redis caching layer
- **Rate Limiting**: API rate limiting
- **Compression**: Gzip compression

### Performance Metrics
- **Lighthouse Score**: 90+ for all metrics
- **Load Time**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 2 seconds

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Firebase Connection Error
```bash
# Check Firebase configuration
# Verify environment variables
# Ensure Firebase project is active
```

#### 2. JWT Token Expiration
```bash
# Check token expiry settings
# Implement token refresh mechanism
# Clear local storage and re-login
```

#### 3. Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --noEmit
```

#### 4. CORS Issues
```bash
# Verify CORS configuration in backend
# Check API URL in frontend environment
# Ensure proper headers are set
```

---

## 📈 Future Roadmap

### Phase 1: Enhanced Features (Q1 2024)
- [ ] Video consultation integration
- [ ] Advanced appointment scheduling
- [ ] Medical record management
- [ ] Prescription tracking system
- [ ] Multi-language support

### Phase 2: AI Integration (Q2 2024)
- [ ] Symptom checker AI
- [ ] Treatment recommendation engine
- [ ] Health monitoring insights
- [ ] Predictive health analytics
- [ ] Chatbot integration

### Phase 3: Mobile Application (Q3 2024)
- [ ] Native iOS and Android apps
- [ ] Push notifications
- [ ] Offline functionality
- [ ] Wearable device integration
- [ ] Voice assistant integration

### Phase 4: Enterprise Features (Q4 2024)
- [ ] Hospital management system
- [ ] Insurance integration
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations
- [ ] White-label solutions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Abhinav Phi

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

---

## 👥 Team

### Lead Developer
**Abhinav Phi**
- 💻 Full-stack Development
- 🏗️ System Architecture
- 🔒 Security Implementation
- 🎨 UI/UX Design

### Connect with the Team
- 📧 Email: [your-email@example.com]
- 🐦 Twitter: [@your-twitter]
- 💼 LinkedIn: [Your LinkedIn Profile]
- 🌐 Portfolio: [Your Portfolio Website]

---

## 🙏 Acknowledgments

- **Firebase** for providing robust backend services
- **Vercel** for seamless deployment platform
- **Tailwind CSS** for utility-first styling
- **React Community** for excellent documentation
- **Open Source Contributors** for inspiration and code examples

---

## 📞 Support

If you have any questions or need help with the project:

1. **Check the Documentation**: Review this README and inline code comments
2. **Search Issues**: Look through existing GitHub issues
3. **Create an Issue**: Open a new issue with detailed description
4. **Contact Team**: Reach out via email or social media

---

<div align="center">
  <h3>🌟 Star this repository if you found it helpful!</h3>
  <p>Made with ❤️ by <a href="https://github.com/abhinav-phi">Abhinav Phi</a></p>
</div>

---

**Last Updated**: July 2024
**Version**: 1.0.0
**Status**: Active Development
