'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('cities', [
      {
        main: '전체',
        sub: '전체',
      },
      {
        main: '서울',
        sub: '전체',
      },
      {
        main: '서울',
        sub: '강남구',
      },
      {
        main: '서울',
        sub: '강동구',
      },
      {
        main: '서울',
        sub: '강북구',
      },
      {
        main: '서울',
        sub: '강서구',
      },
      {
        main: '서울',
        sub: '관악구',
      },
      {
        main: '서울',
        sub: '광진구',
      },
      {
        main: '서울',
        sub: '구로구',
      },
      {
        main: '서울',
        sub: '금천구',
      },
      {
        main: '서울',
        sub: '노원구',
      },
      {
        main: '서울',
        sub: '도봉구',
      },
      {
        main: '서울',
        sub: '동대문구',
      },
      {
        main: '서울',
        sub: '동작구',
      },
      {
        main: '서울',
        sub: '마포구',
      },
      {
        main: '서울',
        sub: '서대문구',
      },
      {
        main: '서울',
        sub: '서초구',
      },
      {
        main: '서울',
        sub: '성동구',
      },
      {
        main: '서울',
        sub: '성북구',
      },
      {
        main: '서울',
        sub: '송파구',
      },
      {
        main: '서울',
        sub: '양천구',
      },
      {
        main: '서울',
        sub: '영등포구',
      },
      {
        main: '서울',
        sub: '용산구',
      },
      {
        main: '서울',
        sub: '은평구',
      },
      {
        main: '서울',
        sub: '종로구',
      },
      {
        main: '서울',
        sub: '중구',
      },
      {
        main: '서울',
        sub: '중랑구',
      },
      {
        main: '경기',
        sub: '전체',
      },
      {
        main: '경기',
        sub: '가평군',
      },
      {
        main: '경기',
        sub: '고양시',
      },
      {
        main: '경기',
        sub: '과천시',
      },
      {
        main: '경기',
        sub: '광명시',
      },
      {
        main: '경기',
        sub: '광주시',
      },
      {
        main: '경기',
        sub: '구리시',
      },
      {
        main: '경기',
        sub: '군포시',
      },
      {
        main: '경기',
        sub: '김포시',
      },
      {
        main: '경기',
        sub: '남양주시',
      },
      {
        main: '경기',
        sub: '동두천시',
      },
      {
        main: '경기',
        sub: '부천시',
      },
      {
        main: '경기',
        sub: '성남시',
      },
      {
        main: '경기',
        sub: '수원시',
      },
      {
        main: '경기',
        sub: '시흥시',
      },
      {
        main: '경기',
        sub: '안산시',
      },
      {
        main: '경기',
        sub: '안성시',
      },
      {
        main: '경기',
        sub: '안양시',
      },
      {
        main: '경기',
        sub: '양주시',
      },
      {
        main: '경기',
        sub: '양평군',
      },
      {
        main: '경기',
        sub: '여주시',
      },
      {
        main: '경기',
        sub: '연천군',
      },
      {
        main: '경기',
        sub: '오산시',
      },
      {
        main: '경기',
        sub: '용인시',
      },
      {
        main: '경기',
        sub: '의왕시',
      },
      {
        main: '경기',
        sub: '의정부시',
      },
      {
        main: '경기',
        sub: '이천시',
      },
      {
        main: '경기',
        sub: '파주시',
      },
      {
        main: '경기',
        sub: '평택시',
      },
      {
        main: '경기',
        sub: '포천시',
      },
      {
        main: '경기',
        sub: '하남시',
      },
      {
        main: '경기',
        sub: '화성시',
      },
      {
        main: '인천',
        sub: '전체',
      },
      {
        main: '인천',
        sub: '강화군',
      },
      {
        main: '인천',
        sub: '계양구',
      },
      {
        main: '인천',
        sub: '미추홀구',
      },
      {
        main: '인천',
        sub: '남동구',
      },
      {
        main: '인천',
        sub: '동구',
      },
      {
        main: '인천',
        sub: '부평구',
      },
      {
        main: '인천',
        sub: '서구',
      },
      {
        main: '인천',
        sub: '연수구',
      },
      {
        main: '인천',
        sub: '옹진군',
      },
      {
        main: '인천',
        sub: '중구',
      },
      {
        main: '대전',
        sub: '전체',
      },
      {
        main: '대전',
        sub: '대덕구',
      },
      {
        main: '대전',
        sub: '동구',
      },
      {
        main: '대전',
        sub: '서구',
      },
      {
        main: '대전',
        sub: '유성구',
      },
      {
        main: '대전',
        sub: '중구',
      },
      {
        main: '세종',
        sub: '전체',
      },
      {
        main: '충남',
        sub: '전체',
      },
      {
        main: '충남',
        sub: '공주시',
      },
      {
        main: '충남',
        sub: '금산군',
      },
      {
        main: '충남',
        sub: '논산시',
      },
      {
        main: '충남',
        sub: '당진시',
      },
      {
        main: '충남',
        sub: '보령시',
      },
      {
        main: '충남',
        sub: '부여군',
      },
      {
        main: '충남',
        sub: '서산시',
      },
      {
        main: '충남',
        sub: '서천군',
      },
      {
        main: '충남',
        sub: '아산시',
      },
      {
        main: '충남',
        sub: '예산군',
      },
      {
        main: '충남',
        sub: '천안시',
      },
      {
        main: '충남',
        sub: '청양군',
      },
      {
        main: '충남',
        sub: '태안군',
      },
      {
        main: '충남',
        sub: '홍성군',
      },
      {
        main: '충남',
        sub: '계룡시',
      },
      {
        main: '충북',
        sub: '전체',
      },
      {
        main: '충북',
        sub: '괴산군',
      },
      {
        main: '충북',
        sub: '단양군',
      },
      {
        main: '충북',
        sub: '보은군',
      },
      {
        main: '충북',
        sub: '영동군',
      },
      {
        main: '충북',
        sub: '옥천군',
      },
      {
        main: '충북',
        sub: '음성군',
      },
      {
        main: '충북',
        sub: '제천시',
      },
      {
        main: '충북',
        sub: '진천군',
      },
      {
        main: '충북',
        sub: '청주시',
      },
      {
        main: '충북',
        sub: '충주시',
      },
      {
        main: '충북',
        sub: '증평군',
      },
      {
        main: '광주',
        sub: '전체',
      },
      {
        main: '광주',
        sub: '광산구',
      },
      {
        main: '광주',
        sub: '남구',
      },
      {
        main: '광주',
        sub: '동구',
      },
      {
        main: '광주',
        sub: '북구',
      },
      {
        main: '광주',
        sub: '서구',
      },
      {
        main: '전남',
        sub: '전체',
      },
      {
        main: '전남',
        sub: '강진군',
      },
      {
        main: '전남',
        sub: '고흥군',
      },
      {
        main: '전남',
        sub: '곡성군',
      },
      {
        main: '전남',
        sub: '광양시',
      },
      {
        main: '전남',
        sub: '구례군',
      },
      {
        main: '전남',
        sub: '나주시',
      },
      {
        main: '전남',
        sub: '담양군',
      },
      {
        main: '전남',
        sub: '목포시',
      },
      {
        main: '전남',
        sub: '무안군',
      },
      {
        main: '전남',
        sub: '보성군',
      },
      {
        main: '전남',
        sub: '순천시',
      },
      {
        main: '전남',
        sub: '신안군',
      },
      {
        main: '전남',
        sub: '여수시',
      },
      {
        main: '전남',
        sub: '영광군',
      },
      {
        main: '전남',
        sub: '영암군',
      },
      {
        main: '전남',
        sub: '완도군',
      },
      {
        main: '전남',
        sub: '장성군',
      },
      {
        main: '전남',
        sub: '장흥군',
      },
      {
        main: '전남',
        sub: '진도군',
      },
      {
        main: '전남',
        sub: '함평군',
      },
      {
        main: '전남',
        sub: '해남군',
      },
      {
        main: '전남',
        sub: '화순군',
      },
      {
        main: '전북',
        sub: '전체',
      },
      {
        main: '전북',
        sub: '고창군',
      },
      {
        main: '전북',
        sub: '군산시',
      },
      {
        main: '전북',
        sub: '김제시',
      },
      {
        main: '전북',
        sub: '남원시',
      },
      {
        main: '전북',
        sub: '무주군',
      },
      {
        main: '전북',
        sub: '부안군',
      },
      {
        main: '전북',
        sub: '순창군',
      },
      {
        main: '전북',
        sub: '완주군',
      },
      {
        main: '전북',
        sub: '익산시',
      },
      {
        main: '전북',
        sub: '임실군',
      },
      {
        main: '전북',
        sub: '장수군',
      },
      {
        main: '전북',
        sub: '전주시',
      },
      {
        main: '전북',
        sub: '정읍시',
      },
      {
        main: '전북',
        sub: '진안군',
      },
      {
        main: '대구',
        sub: '전체',
      },
      {
        main: '대구',
        sub: '남구',
      },
      {
        main: '대구',
        sub: '달서구',
      },
      {
        main: '대구',
        sub: '달성군',
      },
      {
        main: '대구',
        sub: '동구',
      },
      {
        main: '대구',
        sub: '북구',
      },
      {
        main: '대구',
        sub: '서구',
      },
      {
        main: '대구',
        sub: '수성구',
      },
      {
        main: '대구',
        sub: '중구',
      },
      {
        main: '경북',
        sub: '전체',
      },
      {
        main: '경북',
        sub: '경산시',
      },
      {
        main: '경북',
        sub: '경주시',
      },
      {
        main: '경북',
        sub: '고령군',
      },
      {
        main: '경북',
        sub: '구미시',
      },
      {
        main: '경북',
        sub: '군위군',
      },
      {
        main: '경북',
        sub: '김천시',
      },
      {
        main: '경북',
        sub: '문경시',
      },
      {
        main: '경북',
        sub: '봉화군',
      },
      {
        main: '경북',
        sub: '상주시',
      },
      {
        main: '경북',
        sub: '성주군',
      },
      {
        main: '경북',
        sub: '안동시',
      },
      {
        main: '경북',
        sub: '영덕군',
      },
      {
        main: '경북',
        sub: '영양군',
      },
      {
        main: '경북',
        sub: '영주시',
      },
      {
        main: '경북',
        sub: '영천시',
      },
      {
        main: '경북',
        sub: '예천군',
      },
      {
        main: '경북',
        sub: '울릉군',
      },
      {
        main: '경북',
        sub: '울진군',
      },
      {
        main: '경북',
        sub: '의성군',
      },
      {
        main: '경북',
        sub: '청도군',
      },
      {
        main: '경북',
        sub: '청송군',
      },
      {
        main: '경북',
        sub: '칠곡군',
      },
      {
        main: '경북',
        sub: '포항시',
      },
      {
        main: '부산',
        sub: '전체',
      },
      {
        main: '부산',
        sub: '강서구',
      },
      {
        main: '부산',
        sub: '금정구',
      },
      {
        main: '부산',
        sub: '기장군',
      },
      {
        main: '부산',
        sub: '남구',
      },
      {
        main: '부산',
        sub: '동구',
      },
      {
        main: '부산',
        sub: '동래구',
      },
      {
        main: '부산',
        sub: '부산진구',
      },
      {
        main: '부산',
        sub: '북구',
      },
      {
        main: '부산',
        sub: '사상구',
      },
      {
        main: '부산',
        sub: '사하구',
      },
      {
        main: '부산',
        sub: '서구',
      },
      {
        main: '부산',
        sub: '수영구',
      },
      {
        main: '부산',
        sub: '연제구',
      },
      {
        main: '부산',
        sub: '영도구',
      },
      {
        main: '부산',
        sub: '중구',
      },
      {
        main: '부산',
        sub: '해운대구',
      },
      {
        main: '울산',
        sub: '전체',
      },
      {
        main: '울산',
        sub: '남구',
      },
      {
        main: '울산',
        sub: '동구',
      },
      {
        main: '울산',
        sub: '북구',
      },
      {
        main: '울산',
        sub: '울주군',
      },
      {
        main: '울산',
        sub: '중구',
      },
      {
        main: '경남',
        sub: '전체',
      },
      {
        main: '경남',
        sub: '거제시',
      },
      {
        main: '경남',
        sub: '거창군',
      },
      {
        main: '경남',
        sub: '고성군',
      },
      {
        main: '경남',
        sub: '김해시',
      },
      {
        main: '경남',
        sub: '남해군',
      },
      {
        main: '경남',
        sub: '밀양시',
      },
      {
        main: '경남',
        sub: '사천시',
      },
      {
        main: '경남',
        sub: '산청군',
      },
      {
        main: '경남',
        sub: '양산시',
      },
      {
        main: '경남',
        sub: '의령군',
      },
      {
        main: '경남',
        sub: '진주시',
      },
      {
        main: '경남',
        sub: '창녕군',
      },
      {
        main: '경남',
        sub: '창원시',
      },
      {
        main: '경남',
        sub: '통영시',
      },
      {
        main: '경남',
        sub: '하동군',
      },
      {
        main: '경남',
        sub: '함안군',
      },
      {
        main: '경남',
        sub: '함양군',
      },
      {
        main: '경남',
        sub: '합천군',
      },
      {
        main: '강원',
        sub: '전체',
      },
      {
        main: '강원',
        sub: '강릉시',
      },
      {
        main: '강원',
        sub: '고성군',
      },
      {
        main: '강원',
        sub: '동해시',
      },
      {
        main: '강원',
        sub: '삼척시',
      },
      {
        main: '강원',
        sub: '속초시',
      },
      {
        main: '강원',
        sub: '양구군',
      },
      {
        main: '강원',
        sub: '양양군',
      },
      {
        main: '강원',
        sub: '영월군',
      },
      {
        main: '강원',
        sub: '원주시',
      },
      {
        main: '강원',
        sub: '인제군',
      },
      {
        main: '강원',
        sub: '정선군',
      },
      {
        main: '강원',
        sub: '철원군',
      },
      {
        main: '강원',
        sub: '춘천시',
      },
      {
        main: '강원',
        sub: '태백시',
      },
      {
        main: '강원',
        sub: '평창군',
      },
      {
        main: '강원',
        sub: '홍천군',
      },
      {
        main: '강원',
        sub: '화천군',
      },
      {
        main: '강원',
        sub: '횡성군',
      },
      {
        main: '제주',
        sub: '전체',
      },
      {
        main: '제주',
        sub: '서귀포시',
      },
      {
        main: '제주',
        sub: '제주시',
      },
      {
        main: '전국',
        sub: '전체',
      },
      {
        main: '아시아·중동',
        sub: '전체',
      },
      {
        main: '아시아·중동',
        sub: '대만',
      },
      {
        main: '아시아·중동',
        sub: '말레이시아',
      },
      {
        main: '아시아·중동',
        sub: '몽골',
      },
      {
        main: '아시아·중동',
        sub: '미얀마',
      },
      {
        main: '아시아·중동',
        sub: '방글라데시',
      },
      {
        main: '아시아·중동',
        sub: '베트남',
      },
      {
        main: '아시아·중동',
        sub: '사우디아라비아',
      },
      {
        main: '아시아·중동',
        sub: '싱가포르',
      },
      {
        main: '아시아·중동',
        sub: '인도',
      },
      {
        main: '아시아·중동',
        sub: '인도네시아',
      },
      {
        main: '아시아·중동',
        sub: '캄보디아',
      },
      {
        main: '아시아·중동',
        sub: '태국',
      },
      {
        main: '아시아·중동',
        sub: '필리핀',
      },
      {
        main: '아시아·중동',
        sub: '네팔',
      },
      {
        main: '아시아·중동',
        sub: '라오스',
      },
      {
        main: '아시아·중동',
        sub: '몰디브',
      },
      {
        main: '아시아·중동',
        sub: '아랍에미리트연합국',
      },
      {
        main: '아시아·중동',
        sub: '이라크',
      },
      {
        main: '아시아·중동',
        sub: '이란',
      },
      {
        main: '아시아·중동',
        sub: '카타르',
      },
      {
        main: '아시아·중동',
        sub: '우즈베키스탄',
      },
      {
        main: '아시아·중동',
        sub: '기타',
      },
      {
        main: '중국·홍콩',
        sub: '전체',
      },
      {
        main: '중국·홍콩',
        sub: '북경',
      },
      {
        main: '중국·홍콩',
        sub: '천진',
      },
      {
        main: '중국·홍콩',
        sub: '상해',
      },
      {
        main: '중국·홍콩',
        sub: '홍콩',
      },
      {
        main: '중국·홍콩',
        sub: '강소성',
      },
      {
        main: '중국·홍콩',
        sub: '광동성',
      },
      {
        main: '중국·홍콩',
        sub: '사천성',
      },
      {
        main: '중국·홍콩',
        sub: '산동성',
      },
      {
        main: '중국·홍콩',
        sub: '산서성',
      },
      {
        main: '중국·홍콩',
        sub: '섬서성',
      },
      {
        main: '중국·홍콩',
        sub: '안휘성',
      },
      {
        main: '중국·홍콩',
        sub: '요녕성',
      },
      {
        main: '중국·홍콩',
        sub: '절강성',
      },
      {
        main: '중국·홍콩',
        sub: '하남성',
      },
      {
        main: '중국·홍콩',
        sub: '하북성',
      },
      {
        main: '중국·홍콩',
        sub: '흑룡강성',
      },
      {
        main: '중국·홍콩',
        sub: '기타',
      },
      {
        main: '일본',
        sub: '전체',
      },
      {
        main: '일본',
        sub: '도쿄',
      },
      {
        main: '일본',
        sub: '오사카',
      },
      {
        main: '일본',
        sub: '쿄토',
      },
      {
        main: '일본',
        sub: '카고시마',
      },
      {
        main: '일본',
        sub: '카나가와',
      },
      {
        main: '일본',
        sub: '군마',
      },
      {
        main: '일본',
        sub: '니가타',
      },
      {
        main: '일본',
        sub: '토치기',
      },
      {
        main: '일본',
        sub: '미에',
      },
      {
        main: '일본',
        sub: '사이타마',
      },
      {
        main: '일본',
        sub: '시마네',
      },
      {
        main: '일본',
        sub: '시즈오카',
      },
      {
        main: '일본',
        sub: '아이치',
      },
      {
        main: '일본',
        sub: '야마구치',
      },
      {
        main: '일본',
        sub: '야마나시',
      },
      {
        main: '일본',
        sub: '오키나와',
      },
      {
        main: '일본',
        sub: '오이타',
      },
      {
        main: '일본',
        sub: '치바',
      },
      {
        main: '일본',
        sub: '홋카이도',
      },
      {
        main: '일본',
        sub: '후쿠오카',
      },
      {
        main: '일본',
        sub: '히로시마',
      },
      {
        main: '미국',
        sub: '전체',
      },
      {
        main: '미국',
        sub: '보스턴',
      },
      {
        main: '미국',
        sub: '뉴욕',
      },
      {
        main: '미국',
        sub: '시카고',
      },
      {
        main: '미국',
        sub: '로스앤젤레스',
      },
      {
        main: '미국',
        sub: '네바다주',
      },
      {
        main: '미국',
        sub: '노스케롤라이나주',
      },
      {
        main: '미국',
        sub: '뉴욕주',
      },
      {
        main: '미국',
        sub: '뉴저지주',
      },
      {
        main: '미국',
        sub: '로드아일랜드주',
      },
      {
        main: '미국',
        sub: '메릴랜드주',
      },
      {
        main: '미국',
        sub: '미시건주',
      },
      {
        main: '미국',
        sub: '사우스캐롤라이나주',
      },
      {
        main: '미국',
        sub: '애리조나주',
      },
      {
        main: '미국',
        sub: '앨라배마주',
      },
      {
        main: '미국',
        sub: '오레건주',
      },
      {
        main: '미국',
        sub: '오하이오주',
      },
      {
        main: '미국',
        sub: '워싱턴주',
      },
      {
        main: '미국',
        sub: '일리노이주',
      },
      {
        main: '미국',
        sub: '조지아주',
      },
      {
        main: '미국',
        sub: '캘리포니아주',
      },
      {
        main: '미국',
        sub: '코네티컷주',
      },
      {
        main: '미국',
        sub: '콜로라도주',
      },
      {
        main: '미국',
        sub: '테네시주',
      },
      {
        main: '미국',
        sub: '텍사스주',
      },
      {
        main: '미국',
        sub: '펜실베니아주',
      },
      {
        main: '미국',
        sub: '플로리다주',
      },
      {
        main: '북아메리카',
        sub: '전체',
      },
      {
        main: '북아메리카',
        sub: '멕시코',
      },
      {
        main: '북아메리카',
        sub: '캐나다',
      },
      {
        main: '북아메리카',
        sub: '기타',
      },
      {
        main: '남아메리카',
        sub: '전체',
      },
      {
        main: '남아메리카',
        sub: '과테말라',
      },
      {
        main: '남아메리카',
        sub: '브라질',
      },
      {
        main: '남아메리카',
        sub: '칠레',
      },
      {
        main: '남아메리카',
        sub: '파나마',
      },
      {
        main: '남아메리카',
        sub: '페루',
      },
      {
        main: '남아메리카',
        sub: '니카라과',
      },
      {
        main: '남아메리카',
        sub: '도미니카연방',
      },
      {
        main: '유럽',
        sub: '전체',
      },
      {
        main: '유럽',
        sub: '네덜란드',
      },
      {
        main: '유럽',
        sub: '노르웨이',
      },
      {
        main: '유럽',
        sub: '덴마크',
      },
      {
        main: '유럽',
        sub: '독일',
      },
      {
        main: '유럽',
        sub: '러시아',
      },
      {
        main: '유럽',
        sub: '스웨덴',
      },
      {
        main: '유럽',
        sub: '스페인',
      },
      {
        main: '유럽',
        sub: '영국',
      },
      {
        main: '유럽',
        sub: '이탈리아',
      },
      {
        main: '유럽',
        sub: '체코',
      },
      {
        main: '유럽',
        sub: '터키',
      },
      {
        main: '유럽',
        sub: '폴란드',
      },
      {
        main: '유럽',
        sub: '프랑스',
      },
      {
        main: '유럽',
        sub: '헝가리',
      },
      {
        main: '유럽',
        sub: '라트비아',
      },
      {
        main: '유럽',
        sub: '루마니아',
      },
      {
        main: '유럽',
        sub: '바티칸시국',
      },
      {
        main: '유럽',
        sub: '슬로바키아',
      },
      {
        main: '유럽',
        sub: '아르메니아',
      },
      {
        main: '유럽',
        sub: '에스토니아',
      },
      {
        main: '유럽',
        sub: '오스트리아',
      },
      {
        main: '유럽',
        sub: '크로아티아',
      },
      {
        main: '유럽',
        sub: '기타',
      },
      {
        main: '오세아니아',
        sub: '전체',
      },
      {
        main: '오세아니아',
        sub: '괌',
      },
      {
        main: '오세아니아',
        sub: '뉴질랜드',
      },
      {
        main: '오세아니아',
        sub: '피지',
      },
      {
        main: '오세아니아',
        sub: '호주',
      },
      {
        main: '오세아니아',
        sub: '솔로몬제도',
      },
      {
        main: '아프리카',
        sub: '전체',
      },
      {
        main: '아프리카',
        sub: '나이지리아',
      },
      {
        main: '아프리카',
        sub: '모로코',
      },
      {
        main: '아프리카',
        sub: '알제리',
      },
      {
        main: '아프리카',
        sub: '에티오피아',
      },
      {
        main: '아프리카',
        sub: '우간다',
      },
      {
        main: '아프리카',
        sub: '이집트',
      },
      {
        main: '아프리카',
        sub: '케냐',
      },
      {
        main: '아프리카',
        sub: '르완다',
      },
      {
        main: '아프리카',
        sub: '말라위',
      },
      {
        main: '아프리카',
        sub: '세네갈',
      },
      {
        main: '아프리카',
        sub: '앙골라',
      },
      {
        main: '아프리카',
        sub: '코트디부아르',
      },
      {
        main: '아프리카',
        sub: '콩고민주공화국',
      },
      {
        main: '아프리카',
        sub: '기타',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
