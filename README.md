![Title](https://user-images.githubusercontent.com/105336416/182617216-d4156ce3-f572-44d6-a335-5e7fd9183123.png)

# ✨[굿잡 캘린더 사용해보기][goodjob-link]

[goodjob-link]: https://goodjobcalendar.com/ '굿잡 캘린더 바로가기!'

기획

* 취준생들이 일정관리에 어려움을 겪고 있고 채용 일정관리의 니즈가 있다는 사실을 확인

* 취업 준비생들은 채용 일정관리에 도움이 되는 방법으로 개인에게 맞춰진 취업 일정 관리 서비스를 원하고 있습니다.

* 이러한 니즈를 해결하기 위해 굿잡 캘린더는 잡코리아 연동으로 취업준비생의 개인화된 채용 일정 관리 서비스를 제공하기 위해 기획을 하게 되었습니다.


---


굿잡 캘린더의 주요 기능들
===

1️⃣ 이메일 인증을 통한 신뢰감있는 로컬 회원가입 !!
- 비밀번호를 분실해도 이메일로 찾을수 있어요!!

2️⃣ 일일이 하나하나 입력해서 회원가입하기 너무 귀찮을 때는?  
- 카카오 로그인으로 간단하고 안전하게 회원가입 할 수 있어요!!


3️⃣ 나에게 맞는 채용공고만 볼수는 없을까?  
-  추천채용에서 카테고리를 선택하면 나에게 맞는 맞춤형 채용 공고가 와르르!!


4️⃣ 새로운 공고도 보고싶은걸? 
-  잡코리아에서 올라오는 채용공고들을 한시간 단위로 업데이트 해줘서 보여드립니닷!!


5️⃣ 채용공고는 많은데 내 마음에 드는거만 볼 수는 없을까?? 
- `캘린더로 스크랩` 버튼을 통해 나만의 달력으로 `get`


6️⃣ 스크랩은 해놓았는데 너무 많이 했네... 아까 그 공고 어디있더라? 
-  검색창에서 내가 스크랩한 공고를 검색해서 찾을수 있어요!!


7️⃣ 채용공고 말고 다른것도 기록하고 싶은데 흠... 면접 일정이라든가?  
- ➕ 버튼을 눌러서 개인 일정을 작성할 수 있습니다!!✒✒


8️⃣ 회사이름, 제목, 날짜, 시간, 간단한 메모까지 필요한 부분 작성 후 
-  스티커, 배경이미지, 컬러피커까지 꾸미는 다꾸 효과도 뿜뿜!!🎇🎇

---

## Architecture

![아키텍쳐](https://user-images.githubusercontent.com/105336416/182626463-fd010fef-c8f9-4879-ba3b-f1dd66383850.png)

---
## How to use
```
1. fork & clone
2. npm install
3. create .env
4. create MySQL DB: npx sequelize db:create
5. npm run dev
6. create seeds: npx sequelize db:seed:all
```
## 🛠 기술스택
<!-- <img src="https://img.shields.io/badge/이름-색상코드?style=flat-square&logo=로고명&logoColor=로고색"/> -->


📌 BackEnd


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
<br>
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
<br>
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
<br>
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
<br>
![Puppeteer](https://img.shields.io/badge/Puppeteer-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
<br>
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=Passport&logoColor=white)
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">
<br>
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white)



## Feature
1. `Node.js & Express`를 이용한 웹 애플리케이션 서버
2. 유저, 일정, 추천채용공고, 추천채용조건 등 테이블간의 관계를 기반으로 `MySQL` 선택, `Sequelize ORM` 사용
3. MySQL Profiles로 쿼리 성능 테스트 및 쿼리 성능 개선 => 데이터 처리 속도 개선
4. `JWT`를 이용한 로그인 인증, 카카오 소셜로그인
5. puppeteer를 활용한 크롤러 구현, 
6. 최근 일주일, 한달간 유저의 총 참여 시간을 분 단위로 기록
7. Github actions, AWS EC2를 활용한 `CI/CD 파이프라인`
8. `AWS RDS`를 이용하여 데이터베이스 분리
9. 비즈니스 로직을 Controller로 분리 & Controller에 한해 `Typescript` 적용


😥 BE: 개발하면서 어려웠던점


🤟 Trouble Shooting
(우리 팀이 해결한 문제 정리)

1. 
2. 


## Contributors
|name|position|github|
|------|---|---|
|김성현|Node.js|https://github.com/rtg1014|
|황성원|Node.js|https://github.com/Magiof|

</br>

## ⏰ 프로젝트 기간

|||
|:------:|---|
|총 기간| 0월 0일 ~ 8월 5일 (x주)|
|배포일| 8월 1일|
|서비스 개선| 8월 1일 ~ 9월 11일|
