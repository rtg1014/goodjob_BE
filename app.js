const express = require('express');
const morgan = require('morgan'); // 로그 관리
const cors = require('cors');
const hpp = require('hpp'); // 파라미터 오염 방지
const helmet = require('helmet'); // 웹 취약성으로부터 앱을 보호(http://expressjs.com/ko/advanced/best-practice-security.html#use-helmet)
const passport = require('passport');
const expressSession = require('express-session')
const cookieParser = require("cookie-parser");

const app = express();
const dotenv = require('dotenv');
dotenv.config();

// MySQL
const db = require('./models');
db.sequelize
.sync({ logging: false })
.then(() => {
  console.log('MySQL DB 연결 성공');
  })
  .catch((error) => {
    console.error(error);
  });
  
  const passportconfig = require('./passport/kakao.js');
  passportconfig();
  
// middlewares
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: { httpOnly: false, secure: false, sameSite: "lax" },
  })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
  app.use(hpp()); // req.query 오염 방지
  app.use(helmet.xssFilter()); // X-XSS-Protection 설정
  app.use(helmet.frameguard()); // X-Frame-Options 헤더 설정하여 clickjacking에 대한 보호
  app.use(helmet.contentSecurityPolicy()); // Content-Security-Policy 헤더 설정. XSS 공격 및 기타 교차 사이트 인젝션 예방.
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://goodjobcalendar.com', 'https://goodjobcalendar.com'],
      // origin: ['*'], https에서 *이 허용 안되는걸로 알고있음
      credentials: true,
    })
    );
  } else {
    app.use(morgan('dev'));
    app.use(
      cors({
        origin: '*',
        credentials: true,
      })
      );
    }

    
app.get('/', (req, res) => {
  return res.status(200).send('🎇✨Good_job✨🎇');
});

// routes
const router = require('./routes/router');
app.use('/api', router);

module.exports = app;