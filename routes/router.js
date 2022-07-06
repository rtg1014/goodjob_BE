const express = require('express');
const router = express.Router();
const  AuthController  = require('../controllers/authController');

// utils
const { s3Upload } = require('../utils/util');

// middlewares
const middleware = require('../utils/middleware');

// api/auth
router.post('/auth/local', AuthController.create.local); // 이메일 인증받고 가입하기
router.post('/auth/verifyNumberForNew', AuthController.create.verifyNumberForNew); // 인증 번호 확인 and 회원가입
router.post('/auth/lostPassword', AuthController.update.lostPassword); // 인증 메일 발송(비밀번호 분실)
router.delete('/auth/verifyNumberForOld', AuthController.create.verifyNumberForOld); // 인증 번호 확인(비밀번호 분실)
router.patch('/auth/newPassword', AuthController.update.newPassword); //비밀번호 재설정
router.post('/auth', AuthController.get.auth); // 로그인
router.get('/auth/kakao/callback', AuthController.create.kakao); // 카카오 로그인 콜백
// router.delete("/auth/logout", middleware.auth, AuthController.delete.auth);   // 로그아웃
// router.get("/user/me", middleware.auth, UserController.get.user);   // 로그인 유저 정보 가져오기

module.exports = router;
