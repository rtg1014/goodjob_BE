const express = require("express");
const router = express.Router();


// utils
const { s3Upload } = require("../utils/util");

// middlewares
const middleware = require("../utils/middleware");

// api/auth
router.post("/auth/local", AuthController.create.local);   // 회원가입
router.get("/auth/kakao/callback", AuthController.create.kakao);   // 카카오 로그인 콜백
router.post("/auth", AuthController.get.auth);   // 로그인
router.delete("/auth/logout", middleware.auth, AuthController.delete.auth);   // 로그아웃


module.exports = router;