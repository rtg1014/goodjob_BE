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


---
---
----
---
---
---
---

![Title](https://user-images.githubusercontent.com/105336416/182617216-d4156ce3-f572-44d6-a335-5e7fd9183123.png)

# 👉[굿잡 캘린더 사용해보기][boksei-link]

[boksei-link]: https://boksei.com '복세편살 바로가기!'

#### 복지받고 세상 편하게 살자!

복세편살은 복지 정책 및 뉴스 맞춤 추천 사이트입니다!

---

## 프로젝트 소개

### 🛠 Architecture

![서비스 아키텍쳐 (2) (1)](https://user-images.githubusercontent.com/83569413/173172438-0bf9cf27-b3d8-4b80-a1a7-c6b0fab10422.png)

<hr/>

### ⏰ 프로젝트 타임라인

- 4월 22일 ~ 6월 3일 (6주)
- 5월 19일 배포 & 마케팅 & UT 시작
- 5월 27일 누적 사용자 500명 & 조회수 1만회 돌파
- 6월 3일 누적 사용자 600명 & 조회수 2만회 돌파

<hr/>

### 🚀 기능

#### 😃 간단하고 안전한 회원가입

- 카카오를 통한 소셜 로그인으로 간단하고 안전하게 회원가입 할 수 있어요!

#### 😃 간단한 정보 입력으로 복지 정책 추천 받기

- 내가 입력한 정보를 바탕으로 받을 수 있는 복지 정책만 모아서 추천해드려요!

#### 😃 원하는 정책을 검색 기능으로 간편하게

- 키워드 검색이나 정책명, 카테고리 검색으로 빠르게 원하는 정책을 찾을 수 있어요!

#### 😃 자주 찾는 정책은 북마크 기능으로 간편 확인

- 북마크를 해두면 사이드바에서 간편하게 확인할 수 있어요

#### 😳 필요없는 정책이 있을 때는 바로 삭제

- 맞지 않는 정책이 있다면 알려주세요!를 클릭하면 해당 정책이 나에게 더이상 추천되지 않아요!

#### 😜 다른 사람들에게 보여주고 싶은 정책이 있다면 공유하기

- 공유 버튼을 누르면 클립보드로 url이 복사돼요

#### 🤠 입력된 지역 정보를 바탕으로 지역 맞춤 뉴스만 추천

- 입력한 지역 정보에 맞는 맞춤 복지 뉴스 추천돼요

#### 💬 이용자들과의 실시간 채팅 기능

- 복세편살을 이용중인 사람들과 자유롭게 실시간으로 대화를 나눌 수 있어요!

#### 💡 놓치기 쉬운 정책을 알림 서비스로 놓치지 않기

- 정책 신청 기한이 끝나기 일주일 전에 이메일로 정책을 북마크 해둔 사용자에게 알려드려요!
<hr/>

## 🛠 Tools

#### Design

<p>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<br>
  <img src="https://img.shields.io/badge/Adobe Photoshop-31A8FF?style=for-the-badge&logo=Adobe Photoshop&logoColor=white">
  <img src="https://img.shields.io/badge/Adobe Illustrator-FF9A00?style=for-the-badge&logo=Adobe Illustrator&logoColor=white">
</p>

#### Back-end


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
<br>
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
<br>
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
<br>
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
<br>
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=Passport&logoColor=white)
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">
<br>
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white)

#### Front-end

<p>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
<br>
  <img src="https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=Amazon AWS&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
</p>

#### Dev tools

<p> 
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
<br>

<hr>

| 이름       | 포지션       | 개인 깃허브 or 이메일          |
| ---------- | ------------ | ------------------------------ |
| **권지원** | `백엔드` | https://github.com/zzpjw |
| **이푸름** | `백엔드` | https://github.com/pooreumu |
| **김영우** | `백엔드` | https://github.com/rlasuddn |
| **최서라** | `프론트엔드` | https://github.com/Seol827 |
| **한상원** | `프론트엔드` | https://github.com/hsangwon |
| **김지원** | `디자이너` | 🚢 clue653@gmail.com |
| **백지윤** | `디자이너` | 🚢 qorwldbs1027@gmail.com |

## 🔥이슈 및 트러블슈팅

<details>
<summary><b>➡️ CloudFront 배포 관련 문제</b></summary>
  
> **문제** : S3 버킷의 내용을 변경했다고 하더라도 캐시가 유지되는 시간내에서는 해당 변경 내용이 CloudFront에 즉시 반영되지 않는 문제
>
> **해결** : CloudFront의 Invalidations(무효화)를 진행하여 Edge Location에 저장된 캐시를 삭제
  
</details>

<details>
<summary><b>➡️ useSWR</b></summary>
  
> **문제** : Redux의 경우 서버의 응답값을 저장해 놓는 스토어 역할이 아닌 전역 상태 관리를 위한 라이브러리로, useEffect를 통해 mount될 때마다 서버에 불필요한 GET 요청을 하게 된다.
>
> **해결** :  SWR은 기존 흐름을 벗어나지 않고 캐시 기능까지 가능한 data Fetching 라이브러리이며, 리덕스 action, reducer, store 등을 사용하지 않아 로직이 매우 간결해진다. 또한 캐시된 데이터를 활용하여 불필요한 데이터 호출과 랜더링에 시간을 쓰지 않아 효율적이다.
</details>

<details>
<summary><b>➡️ 성능 문제</b></summary>
  
> **문제** : 유저 정보를 통한 뉴스 크롤링과 정책 추천 로직이 메인 페이지가 보여질 때마다 지속적으로 계산되어야 하기 때문에 트레픽이 늘어남에 따라 디스크 사용량과 CPU 계산량이 크게 늘어나 성능상의 문제가 있었음
>
> **해결방안** : 계산된 데이터들을 캐싱 처리하여 불필요하게 반복되는 정책 추천 로직 줄이기
>
> **해결** : DB로의 직접적인 접근을 최소화 시켜서 처리 속도를 향상시킬 수 있는 키-밸류 인메모리 데이터베이스 Redis를 도입
>
> **효과** : [redis 적용 효과 전후비교](https://enshrined-scallion-665.notion.site/redis-23c488ee761d4e8b84bf95ae101cdaa6)
  
</details>

<details>
<summary><b>➡️ 공공API 분류 문제</b></summary>

> **설명** : 데이터가 자체적으로 아동, 청소년, 청년, 노년 등의 생애주기로 분류가 되어 있어서 정확한 나이에 따라 정책을 분류할 수 없었고, 소득 기준이 적용되는 정책이 모두 저소득 정책으로만 분류가 되어 있어서 정확한 소득 분위에 따라 정책이 분류할 수 없는 문제가 있었습니다. 또한 미혼모를 포함해야할 임산부 정책이 결혼으로 카테고리화 되어있는 등의 잘못된 카테고리화 문제가 있었고 카테고리화 되어있지 않은 데이터들이 많았습니다.
>
> **해결** : 정책 세부 내용 등에서 패턴 파악과 정규식 키워드 추출을 통해 자체 분류 기준 생성 및 재카테고리화를 진행하여 해결
  
</details>

<details>
<summary><b>➡️ 비동기 처리 방식에 관한 문제</b></summary>

> **설명** : 레디스 전략으로 롸잇 쓰로우 전략을 사용하기 때문에 유저 정보가 바뀔때마다 레디스 셋을 하는데 이 세 가지의 레디스 셋이 서로 독립적임에도 불구하고 어싱크 어웨잇을 사용하고 있었기 때문에 성능상의 문제가 있을 수 있다는 점을 파악/클랜징 과정에서도 마찬가지의 문제가 발생
>
> **해결** : 프로미스 올을 사용하여 세가지 레디스 셋 작업이 동시에 이루어질 수 있도록 코드를 수정
>
> **효과** : [비동기 처리 방식 전후비교](https://enshrined-scallion-665.notion.site/async-await-vs-Promise-all-74013b19e54a43258aee8a2a7560d8ae)
</details>

