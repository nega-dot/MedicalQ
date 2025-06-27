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

// error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;