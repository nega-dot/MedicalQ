const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./Middlewares/Error');
const { time } = require('console');

const app = express();
app.set('trust proxy', 1);

// security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      scriptSrc:  ["'self'"],
      imgSrc:     ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS setup
const corsOptions = {
  origin(origin, callback) {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:3001',
    ];
    // allow non-browser requests (e.g. Postman)
    if (!origin) return callback(null, true);
    if (allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
};

app.use(cors(corsOptions));
// >>> ensure every preflight (OPTIONS) is handled by CORS <<< 
app.options('*', cors(corsOptions));

// rate limiting (global)
const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// other middleware
app.use(compression());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: ['specialization','role'] }));

// logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// auth-specific rate limiter
const authLimiter = rateLimit({
  windowMs: 15*60*1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
  },
});

// mount auth routes
app.use('/api/auth', authLimiter, authRoutes);

// catch-all 404
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});
// Doctor registration
app.post('/form/doctors', async (req, res) => {
    const { name, age, specialty, authentication_token, username, password } = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const credentialsColl = db.collection('CREDENTIALS');

        const existing = await credentialsColl.findOne({ username });
        if (existing) return res.json({ result: false, message: "Username already exists" });

        await credentialsColl.insertOne({ username, password });
        await db.collection('PROFILES DOCTORS').insertOne({ name, age, specialty, authentication_token ,username,community: "general"});

        res.json({ result: true, message: "Doctor registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during doctor registration");
    }
});

// Patient registration
app.post('/form/patients', async (req, res) => {
    const { name, age, disease, username, password } = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const credentialsColl = db.collection('CREDENTIALS');

        const existing = await credentialsColl.findOne({ username });
        if (existing) return res.json({ result: false, message: "Username already exists" });

        await credentialsColl.insertOne({ username, password });
        await db.collection('PROFILES PATIENTS').insertOne({ name, age, disease, username, community: "general" });

        res.json({ result: true, message: "Patient registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during patient registration");
    }
});

// Sign-in route
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const user = await db.collection('CREDENTIALS').findOne({ username, password });
        if (!user) {
            return res.status(401).json({ result: false, message: "Invalid credentials" });
        }
        res.json({ result: true, message: "Sign in successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during sign in");
    }
});

// Send message
app.post('/askquestion', async (req, res) => {
    const { message, sender, community, type, time } = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const result = await db.collection('MESSAGES').insertOne({ message, sender, community, type, answers: "", time: new Date().toISOString() });
        res.json({ message: "Message sent successfully", result });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting message");
    }
});

// Get messages for a community
app.post('/messagebox', async (req, res) => {
    const { community } = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const messages = await db.collection('MESSAGES').find({ community }).toArray();
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching messages");
    }
});
app.post('/answer', async (req, res) => {
    const { message_id, answer, doctor_username } = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const message = await db.collection('MESSAGES').findOne({ time: message_id });
        message.answers = message.answers || [];
        message.answers.push({ answer, doctor_username, time: new Date().toISOString() });
        await db.collection('MESSAGES').updateOne({ time: message_id }, { $set: { answers: message.answers } });
        res.json({ message: "Answer submitted successfully", result });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting answer");
    }
});
app.post('/getprofiles',async(req,res)=>{
    const {username} = req.body;
    if (!mongoClient) return res.status(500).send("MongoDB not connected");
    try {
        const db = mongoClient.db('FIRSTDB');
        const profiles = await db.collection('PROFILES DOCTORS').find({ username:req.body.username }).toArray();
        res.json(profiles);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching profiles");
    }
});

// error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
