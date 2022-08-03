# goodjob_BE
항해 99 7기 2조 프로젝트 굿잡 백엔드 레포 입니다
# clone coding

✨ 주제 : 싸이월드
===========

내용
---

* 80-90년생의 추억의 사이트이자 SNS 라는 단어가 활용되기도 전 한국에서 가장 핫했던 커뮤니티 사이트를 클론코딩 하였습니다. 
* 추억의 사이트인 싸이월드를 클론코딩하면서 과거에 사용되었던 기능들과 새롭게 추가됬으면 좋았을 기능들을 추가해서 구현하는데 중점을 두었습니다.

---

😎 싸이월드를 제작한 자랑스러운 개발자들
---

👉 BE : 김성준, 김성현
<br>
👉 FE : 이윤, 구자덕

---
기능 구현
===

👉 이메일,패스워드,자신의 이름 혹은 닉네임을 작성해서 가입하고 활동을 시작합니다.

👉 비밀번호를 분실했을 시 가입했던 이메일로 인증번호를 전송해서 비밀번호를 초기화 하는 기능

👉 회원가입후 자신의 미니홈피를 만들수도있고, 다른이들의 미니홈피를 방문해서 볼 수 도 있습니다.

👉 자신의 미니홈피의 프로필사진, 소개글 등을 자유롭게 꾸밀 수 있습니다.

👉 자신의 미니홈피에 원하는 노래로 BGM 을 설정할 수 있습니다.

👉 와글와글 : 현재 싸이월드에 접속중인 유저들끼리 자유롭게 라이브 채팅을 할 수 있습니다.

---

🛠 tools
===
<!-- <img src="https://img.shields.io/badge/이름-색상코드?style=flat-square&logo=로고명&logoColor=로고색"/> -->


📌 BackEnd

<img src="https://img.shields.io/badge/javascript-333333?style=flat-square&logo=javascript&logoColor=yellow"/> <img src="https://img.shields.io/badge/mysql-3333ff?style=flat-square&logo=firebase&logoColor=white"/> 
<img src="https://img.shields.io/badge/express-666666?style=flat-square&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-33cc00?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-ffcc33?style=flat-square&logo=AWS&logoColor=white"/> 


<img src="https://img.shields.io/badge/jsonwebtoken-333333?style=flat-square&logo=json web token&logoColor=white"/> <img src="https://img.shields.io/badge/Socket.io-33cc00?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/winston-33ccff?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/multer-cc0033?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/sequelize-ffff33?style=flat-square&logo=Node.js&logoColor=black"/>



📌 Front-end

<img src="https://img.shields.io/badge/javascript-333333?style=flat-square&logo=javascript&logoColor=yellow"/> <img src="https://img.shields.io/badge/HTML-ff3300?style=flat-square&logo=HTML&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-3366ff?style=flat-square&logo=CSS&logoColor=white"/>

<img src="https://img.shields.io/badge/react-33ffff?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/REDUX-6600cc?style=flat-square&logo=REDUX&logoColor=white"/> <img src="https://img.shields.io/badge/REACT ROUTER-6600cc?style=flat-square&logo=REACT ROUTER&logoColor=white"/> 



<br>

---


API 명세서
===

![uml 재료 1](https://user-images.githubusercontent.com/105336416/173999191-a791ed0b-65a4-4967-b91d-56c4af81c0a4.PNG)

![uml 재료 2](https://user-images.githubusercontent.com/105336416/173999295-489c46a7-1a57-4ab5-922a-a9c8af0dced0.PNG)


<!-- 
| 페이지 | 기능 | API URL | Method | request(가져갈 데이터)|response(서버로부터 받아올 데이터)|     
|:------:|:------:|:---:|:------:|:---:|:---:|
|홈|회원정보로 이동| x | x | x |x |
|회원정보|회원가입|/api/signup|/api/signup|email,password|token; result : [{""success"",nickname}] OR message: '이메일 또는 패스워드 확인해주세요'}"|
|회원정보|로그인|/api/login|POST|email,password|token; result : [{""success"",nickname}] OR message: '이메일 또는 패스워드 확인해주세요'|
|회원정보|중복검사 이메일|/api/duplicatesemail/:email|GET|email|Message: '사용 가능한 이메일 입니다' OR Message: '중복된 이메일 입니다' |
|회원정보|중복검사 닉네임|/api/duplicatesnick/:nickname|GET|nickname|Message: '사용 가능한 닉네임 입니다' OR Message: '중복된 닉네임 입니다' |
|메인|여행 게시물 조회|/api/travel|GET|x|boardId,title,image,nickname|
|메인|게시물 작성|/api/travels|x|title,image,content|boardId,title,image,content|
|메인|게시물 상세 조회|/api/travels/:boardId|GET|x|boardId,title,image,content,nickname|
|Detail|게시물 수정|/api/travels/:boardId|PATCH|"title,image,content|boardId,title,image,content|
|Detail|게시물 삭제|/api/travels/:boardId|DELETE|x|boardId| -->

---
---

💎BE 우리가 새롭게 도전한 기술들
===
1. router, Controller, Services 를 나눔으로써 의존성은 낮추고 응집도는 높게 구현

2. 해싱을 사용해서 사용자의 비밀번호가 DB에 암호화되서 저장되게끔 구현

3. dotenv로 환경변수 설정해서 중요한 키값을 환경변수로 처리하여 다른사람이 보지못하게 구현. 

4. DB를 기존에 사용하던 mongodb 가 아닌 MYSQL 을 사용 

5. MYSQL 을 사용할 때 다른 테이블의 키값을 가져오기 위해서 외래키를 사용

6. 비밀번호 찾기 기능을 구현하기 위해서 nodemailer 를 사용

7. 채팅 기능을 구현하기 위해 socket.io를 사용

8. 음악 기능을 구현하기 위해 stream 방식을 사용

9. 프로필 사진 업로드를 위해 S3와 multer를 사용

---

😥 BE: 개발하면서 어려웠던점
1. Stream 방식의 데이터 전송이나 웹소켓을 활용한 실시간 통신이 기존에 CRUD에서 사용한 통신 방식과 달라 그 부분을 이해하는데 시간이 많이 소요됨

🤟 Trouble Shooting
(우리 팀이 해결한 문제 정리)

1. socket.io의 room 기능을 활용해 데이터 분산
2. stream 방식으로 오디오 파일을 전송해 서버 과부화 해결
