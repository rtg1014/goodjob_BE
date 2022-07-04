const express = require('express');
const router = express.Router();

//controller
const AuthController = require('../controllers/authController');

// utils
const { s3Upload } = require('../utils/util');

// middlewares
const middleware = require('../utils/middleware');

// api/auth
router.post('/auth/local', AuthController.create.local); // 회원가입
router.post('/auth/duplicatesEmail/', AuthController.get.duplicate); // 중복확인
router.post('/auth/sendEmail/', AuthController.create.sendEmail); // 인증 메일 발송
router.post('/auth/verifyNumber/', AuthController.delete.verifyNumber)    // 인증 번호 확인
// router.get("/auth/kakao/callback", AuthController.create.kakao);   // 카카오 로그인 콜백
router.post("/auth", AuthController.get.auth);   // 로그인
// router.delete("/auth/logout", middleware.auth, AuthController.delete.auth);   // 로그아웃
// router.get("/user/me", middleware.auth, UserController.get.user);   // 로그인 유저 정보 가져오기

module.exports = router;
