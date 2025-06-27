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

// Mongoose models
const Credential = require('./models/Credential');
const DoctorProfile = require('./models/DoctorProfile');
const PatientProfile = require('./models/PatientProfile');
const Message = require('./models/Message');

const app = express();
app.set('trust proxy', 1);

// security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// CORS setup
const corsOptions = {
    origin(origin, callback) {
        const allowed = ['http://localhost:5173', 'http://localhost:3001'];
        if (!origin) return callback(null, true); // Allow non-browser clients
        if (allowed.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
}));

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: ['specialization', 'role'] }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// rate limiter for auth
app.use('/api/auth', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    message: { success: false, message: 'Too many auth attempts, try again later.' },
}), authRoutes);

// Doctor registration
app.post('/form/doctors', async (req, res) => {
    const { name, age, specialty, authentication_token, username, password } = req.body;
    try {
        const existing = await Credential.findOne({ username });
        if (existing) return res.json({ result: false, message: "Username already exists" });

        await Credential.create({ username, password });
        await DoctorProfile.create({ name, age, specialty, authentication_token, username, community: "general" });

        res.json({ result: true, message: "Doctor registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during doctor registration");
    }
});

// Patient registration
app.post('/form/patients', async (req, res) => {
    const { name, age, disease, username, password } = req.body;
    try {
        const existing = await Credential.findOne({ username });
        if (existing) return res.json({ result: false, message: "Username already exists" });

        await Credential.create({ username, password });
        await PatientProfile.create({ name, age, disease, username, community: "general" });

        res.json({ result: true, message: "Patient registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during patient registration");
    }
});

// Sign-in
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Credential.findOne({ username, password });
        if (!user) return res.status(401).json({ result: false, message: "Invalid credentials" });
        res.json({ result: true, message: "Sign in successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during sign in");
    }
});

// Send message
app.post('/askquestion', async (req, res) => {
    const { message, sender, community } = req.body;
    try {
        const result = await Message.create({
            message, sender, community, type: "question", answers: [], time: new Date().toISOString()
        });
        res.json({ message: "Message sent successfully", result });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting message");
    }
});

// Get messages for a community
app.post('/messagebox', async (req, res) => {
    const { community } = req.body;
    try {
        const messages = await Message.find({ community });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching messages");
    }
});

// Submit answer
app.post('/answer', async (req, res) => {
    const { message_id, answer, doctor_username } = req.body;
    try {
        const message = await Message.findOne({ time: message_id });
        if (!message) return res.status(404).json({ result: false, message: "Message not found" });

        const newAnswer = { answer, doctor_username, time: new Date().toISOString() };
        message.answers.push(newAnswer);
        await message.save();

        res.json({ message: "Answer submitted successfully", result: newAnswer });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting answer");
    }
});

// Get doctor profiles
app.post('/getprofiles', async (req, res) => {
    const { username } = req.body;
    try {
        const profiles = await DoctorProfile.find({ username });
        res.json(profiles);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching profiles");
    }
});

// 404 & error handling
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;

