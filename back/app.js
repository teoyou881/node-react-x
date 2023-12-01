const express = require('express');
const app = express();
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const cors = require('cors');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

dotenv.config();

// const port = process.env.NODE_ENV === "production" ? 80 : 3065;
// change port to 3065 because nginx is using port 80
const port = 3065;

if (process.env.NODE_ENV === 'production') {
  // when using nginx, should be set for cookie
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      // domain was changed 'https~'
      origin: ['https://teonodex.com'],
      credentials: true,
    }),
  );
} else {
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(morgan('dev'));
}

// why use path.join? --> window and mac use different slash to separate folders
// window: \   mac: /
app.use('/', express.static(path.join(__dirname, 'uploads'))); // back/uploads folder is now accessible to the front
passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    savedUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    // when use nginx, should be set for cookie
    proxy: true,
    cookie: {
      // cookie will not be accessible by javascript
      httpOnly: true,
      // after applying https, secure: true
      // if process.env.NODE_ENV is production, secure: true
      secure: process.env.NODE_ENV === 'production',
      // this is for cookie to be shared between front and back
      domain: process.env.NODE_ENV === 'production' && '.teonodex.com',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`Teo's nodeX`);
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(port, () => {
  db.sequelize.sync().then(() => {
    console.log('db is connected');
  });
  console.log(`Server is running ${port}`);
});
