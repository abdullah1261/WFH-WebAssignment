const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const coursesRouter = require('./routes/courses');
const enrollmentsRouter = require('./routes/enrollments');
const authMiddleware = require('./middleware/authMiddleware');
const adminRouter = require('./routes/adminRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/course-enrollment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Render the login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Authenticate the user (dummy example using bcrypt)
  const hashedPassword = '$2a$10$NmS3CgDyEOyInWZ6s9I4m..oqW2aKpj/LlmkuQ5Q.tPYxgItIjs/O';
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (result) {
      // User authenticated successfully
      res.send('Login successful!');
    } else {
      // Incorrect username or password
      res.send('Invalid credentials');
    }
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/api/courses', authMiddleware, coursesRouter);
app.use('/api/enrollments', authMiddleware, enrollmentsRouter);

// Admin dashboard routes
app.use('/admin', authMiddleware, adminRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

module.exports = app;
