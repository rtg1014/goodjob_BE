const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const ScheduleController = require('../controllers/scheduleController');
const PostingController = require('../controllers/postingController');
// utils
const { s3Upload } = require('../utils/util');

// middlewares
const {auth, joiMiddleware} = require('../utils/middleware');

// api/auth
router.post('/auth/local', joiMiddleware('localSchema'), AuthController.create.local); // 이메일 인증받고 가입하기
router.post('/auth/verifyNumberForNew', joiMiddleware('verifyNumberForNewSchema'), AuthController.create.verifyNumberForNew); // 인증 번호 확인 and 회원가입
router.post('/auth/lostPassword', joiMiddleware('lostPasswordSchema'), AuthController.update.lostPassword); // 인증 메일 발송(비밀번호 분실)
router.delete('/auth/verifyNumberForOld', joiMiddleware('verifyNumberForOldSchema'), AuthController.create.verifyNumberForOld); // 인증 번호 확인(비밀번호 분실)
router.patch('/auth/newPassword', joiMiddleware('newPasswordSchema'), AuthController.update.newPassword); // 비밀번호 재설정
router.post('/auth', joiMiddleware('authSchema'), AuthController.get.auth); // 로그인
router.get('/auth/kakao/callback', AuthController.create.kakao); // 카카오 로그인 콜백

// api/schedule
router.post('/schedule', auth, joiMiddleware('myScheduleSchema'), ScheduleController.create.mySchedule); // 수동 스케줄 생성
router.post('/schedule/scrap', auth, joiMiddleware('scrapSchema'), ScheduleController.create.scrap); // 자동 스케줄 생성 (=== 스크랩)
router.get('/schedule/daily', auth, ScheduleController.get.daily); // 일간 일정 조회
router.get('/schedule/weekly', auth, ScheduleController.get.weekly); // 주간 스케줄 조회
router.get('/schedule/monthly', auth, ScheduleController.get.monthly); // 월간 일정 조회
router.get('/schedule/search', auth, ScheduleController.get.search); // 일정 검색
router.get('/schedule/:scheduleId', auth, ScheduleController.get.detail); // 일정 상세 조회
router.patch('/schedule/:scheduleId', auth, joiMiddleware('myScheduleSchema'), ScheduleController.update.modify); // 일정 상세 수정
router.delete('/schedule/:scheduleId', auth, ScheduleController.delete.delete); // 일정 상세 삭제

//  api/posting
router.patch('/posting/category', auth, joiMiddleware('categorySchema'), PostingController.update.category); // 추천채용 세팅 변경
router.get('/posting/category', auth, PostingController.get.category); // 추천채용 세팅 조회
router.get('/posting', auth, PostingController.get.postings); // 추천채용 조회
router.get('/posting/:postingId', auth, PostingController.get.posting); // 추천채용 상세 조회
module.exports = router;
