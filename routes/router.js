const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const ScheduleController = require('../controllers/scheduleController');
const PostingController = require('../controllers/postingController');
// utils
const { s3Upload } = require('../utils/util');

// middlewares
const middleware = require('../utils/middleware');

// api/auth
router.post('/auth/local', AuthController.create.local); // 이메일 인증받고 가입하기
router.post(
  '/auth/verifyNumberForNew',
  AuthController.create.verifyNumberForNew
); // 인증 번호 확인 and 회원가입
router.post('/auth/lostPassword', AuthController.update.lostPassword); // 인증 메일 발송(비밀번호 분실)
router.delete(
  '/auth/verifyNumberForOld',
  AuthController.create.verifyNumberForOld
); // 인증 번호 확인(비밀번호 분실)
router.patch('/auth/newPassword', AuthController.update.newPassword); // 비밀번호 재설정
router.post('/auth', AuthController.get.auth); // 로그인
router.get('/auth/kakao/callback', AuthController.create.kakao); // 카카오 로그인 콜백
// router.delete("/auth/logout", middleware.auth, AuthController.delete.auth);   // 로그아웃
// router.get("/user/me", middleware.auth, UserController.get.user);   // 로그인 유저 정보 가져오기

// api/schedule
router.post('/schedule', middleware.auth, ScheduleController.create.mySchedule); // 수동 스케줄 생성
router.post('/schedule/scrap', ScheduleController.create.scrap); // 자동 스케줄 생성
router.get('/schedule/weekly', ScheduleController.get.weekly); // 주간 스케줄 조회

//  api/posting
router.patch('/posting/category', middleware.auth, PostingController.update.category); // 추천채용 카테고리 변경
router.get('/posting/category', middleware.auth, PostingController.get.category); // 추천채용 카테고리 조회

module.exports = router;
