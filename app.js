//==============================================================================
// set up express app ==========================================================
//==============================================================================
const express             = require('express');
const app                 = express();
const morgan              = require('morgan');
const rateLimit           = require('express-rate-limit');
const helmet              = require('helmet');
const mongoSanitize       = require('express-mongo-sanitize');
const xss                 = require('xss-clean');
const hpp                 = require('hpp');
const cookieParser        = require('cookie-parser');
const bodyParser          = require('body-parser');
const compression         = require('compression');
const cors                = require('cors');
const path                = require('path');
const AppError            = require('./utils/appError');
const globalErrorHandler  = require('./app/controllers/errorController');
const tourRouter          = require('./app/routes/tourRoutes');
const userRouter          = require('./app/routes/userRoutes');
const reviewRouter        = require('./app/routes/reviewRoutes');
const bookingRouter       = require('./app/routes/bookingRoutes');
const bookingController   = require('./app/controllers/bookingController');
const viewRouter          = require('./app/routes/viewRoutes');


//==============================================================================
// configuration ===============================================================
//==============================================================================
app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// set up cors to allow us to accept requests from our client
// app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//==============================================================================
// configuration ===============================================================
//==============================================================================

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  bookingController.webhookCheckout
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/',                  viewRouter);
app.use('/api/v1/tours',      tourRouter);
app.use('/api/v1/users',      userRouter);
app.use('/api/v1/reviews',    reviewRouter);
app.use('/api/v1/bookings',   bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
