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

    await queryInterface.bulkInsert('jobs', [
      {
        main: '전체',
        sub : '전체',
      },
      {
        main: '경영·사무',
        sub : '전체',
      },
      {
        main: '경영·사무',
        sub: '기획·전략·경영',
      },
      {
        main: '경영·사무',
        sub: '사무·총무·법무',
      },
      {
        main: '경영·사무',
        sub: '인사·노무·교육',
      },
      {
        main: '경영·사무',
        sub: '경리·회계·결산',
      },
      {
        main: '경영·사무',
        sub: '재무·세무·IR',
      },
      {
        main: '경영·사무',
        sub: '사무보조·문서작성',
      },
      {
        main: '경영·사무',
        sub: '비서·안내',
      },
      {
        main: '마케팅·광고·홍보',
        sub : '전체',
      },
      {
        main: '마케팅·광고·홍보',
        sub: '마케팅·광고·분석',
      },
      {
        main: '마케팅·광고·홍보',
        sub: '홍보·PR',
      },
      {
        main: '마케팅·광고·홍보',
        sub: '전시·컨벤션',
      },
      {
        main: 'IT·인터넷',
        sub : '전체',
      },
      {
        main: 'IT·인터넷',
        sub: '웹프로그래머',
      },
      {
        main: 'IT·인터넷',
        sub: '응용프로그래머',
      },
      {
        main: 'IT·인터넷',
        sub: '시스템프로그래머',
      },
      {
        main: 'IT·인터넷',
        sub: 'DBA·데이터베이스',
      },
      {
        main: 'IT·인터넷',
        sub: '네트워크·서버·보안',
      },
      {
        main: 'IT·인터넷',
        sub: '웹기획·PM',
      },
      {
        main: 'IT·인터넷',
        sub: '웹마케팅',
      },
      {
        main: 'IT·인터넷',
        sub: '컨텐츠·사이트운영',
      },
      {
        main: 'IT·인터넷',
        sub: 'HTML·퍼블리싱·UI개발',
      },
      {
        main: 'IT·인터넷',
        sub: '웹디자인',
      },
      {
        main: 'IT·인터넷',
        sub: 'QA·테스터·검증',
      },
      {
        main: 'IT·인터넷',
        sub: '게임',
      },
      {
        main: 'IT·인터넷',
        sub: 'ERP·시스템분석·설계',
      },
      {
        main: 'IT·인터넷',
        sub: 'IT·디자인·컴퓨터강사',
      },
      {
        main: 'IT·인터넷',
        sub: '동영상제작·편집',
      },
      {
        main: 'IT·인터넷',
        sub: '빅데이터·AI(인공지능)',
      },
      {
        main: 'IT·인터넷',
        sub: '소프트웨어·하드웨어',
      },
      {
        main: '디자인',
        sub : '전체',
      },
      {
        main: '디자인',
        sub: '그래픽디자인·CG',
      },
      {
        main: '디자인',
        sub: '출판·편집디자인',
      },
      {
        main: '디자인',
        sub: '제품·산업디자인',
      },
      {
        main: '디자인',
        sub: '캐릭터·애니메이션',
      },
      {
        main: '디자인',
        sub: '광고·시각디자인',
      },
      {
        main: '디자인',
        sub: '의류·패션·잡화디자인',
      },
      {
        main: '디자인',
        sub: '전시·공간디자인',
      },
      {
        main: '디자인',
        sub: '디자인기타',
      },
      {
        main: '무역·유통',
        sub : '전체',
      },
      {
        main: '무역·유통',
        sub: '해외영업·무역영업',
      },
      {
        main: '무역·유통',
        sub: '수출입·무역사무',
      },
      {
        main: '무역·유통',
        sub: '구매·자재',
      },
      {
        main: '무역·유통',
        sub: '상품기획·MD',
      },
      {
        main: '무역·유통',
        sub: '유통·물류·재고',
      },
      {
        main: '무역·유통',
        sub: '배송·택배·운송',
      },
      {
        main: '무역·유통',
        sub: '운전·기사',
      },
      {
        main: '무역·유통',
        sub: '화물·중장비',
      },
      {
        main: '영업·고객상담',
        sub : '전체',
      },
      {
        main: '영업·고객상담',
        sub: '제품·서비스영업',
      },
      {
        main: '영업·고객상담',
        sub: '금융·보험영업',
      },
      {
        main: '영업·고객상담',
        sub: 'IT·솔루션·기술영업',
      },
      {
        main: '영업·고객상담',
        sub: '영업관리·지원·영업기획',
      },
      {
        main: '영업·고객상담',
        sub: '광고영업',
      },
      {
        main: '영업·고객상담',
        sub: '법인영업',
      },
      {
        main: '영업·고객상담',
        sub: '판매·서빙·매장관리',
      },
      {
        main: '영업·고객상담',
        sub: '단순홍보·회원관리',
      },
      {
        main: '영업·고객상담',
        sub: '아웃바운드TM',
      },
      {
        main: '영업·고객상담',
        sub: '고객상담·인바운드',
      },
      {
        main: '영업·고객상담',
        sub: 'CS관리·강의',
      },
      {
        main: '서비스',
        sub : '전체',
      },
      {
        main: '서비스',
        sub: '요리·영양·제과제빵·바리스타',
      },
      {
        main: '서비스',
        sub: '설치·정비·A/S',
      },
      {
        main: '서비스',
        sub: '시설·보안·경비·안전',
      },
      {
        main: '서비스',
        sub: '레저·스포츠',
      },
      {
        main: '서비스',
        sub: '여행·항공·숙박',
      },
      {
        main: '서비스',
        sub: '뷰티·미용·애완',
      },
      {
        main: '서비스',
        sub: '주차·세차·주유',
      },
      {
        main: '서비스',
        sub: '청소·가사·육아',
      },
      {
        main: '서비스',
        sub: '이벤트·웨딩·도우미',
      },
      {
        main: '연구개발·설계',
        sub : '전체',
      },
      {
        main: '연구개발·설계',
        sub: '자동차·조선·기계',
      },
      {
        main: '연구개발·설계',
        sub: '반도체·디스플레이',
      },
      {
        main: '연구개발·설계',
        sub: '화학·에너지·환경',
      },
      {
        main: '연구개발·설계',
        sub: '전기·전자·제어',
      },
      {
        main: '연구개발·설계',
        sub: '기계설계·CAD·CAM',
      },
      {
        main: '연구개발·설계',
        sub: '통신기술·네트워크구축',
      },
      {
        main: '연구개발·설계',
        sub: '바이오·제약·식품',
      },
      {
        main: '생산·제조',
        sub : '전체',
      },
      {
        main: '생산·제조',
        sub: '생산관리·공정관리·품질관리',
      },
      {
        main: '생산·제조',
        sub: '생산·제조·설비·조립',
      },
      {
        main: '생산·제조',
        sub: '포장·가공',
      },
      {
        main: '생산·제조',
        sub: '섬유·의류·패션',
      },
      {
        main: '교육',
        sub : '전체',
      },
      {
        main: '교육',
        sub: '유치원·보육교사',
      },
      {
        main: '교육',
        sub: '초중고·특수학교',
      },
      {
        main: '교육',
        sub: '대학교수·강사·행정직',
      },
      {
        main: '교육',
        sub: '보습학원·입시학원',
      },
      {
        main: '교육',
        sub: '학원상담·관리·운영',
      },
      {
        main: '교육',
        sub: '학습지·과외·방문교사',
      },
      {
        main: '교육',
        sub: '외국어교육',
      },
      {
        main: '교육',
        sub: '자격증·기술·전문교육',
      },
      {
        main: '교육',
        sub: '교재기획·교수설계',
      },
      {
        main: '건설',
        sub : '전체',
      },
      {
        main: '건설',
        sub: '건축·설계·인테리어',
      },
      {
        main: '건설',
        sub: '시공·현장·감리·공무',
      },
      {
        main: '건설',
        sub: '토목·조경·도시·측량',
      },
      {
        main: '건설',
        sub: '전기·소방·통신·안전',
      },
      {
        main: '건설',
        sub: '환경·플랜트',
      },
      {
        main: '건설',
        sub: '부동산·중개·분양·경매',
      },
      {
        main: '의료',
        sub : '전체',
      },
      {
        main: '의료',
        sub: '의사·치과·한의사',
      },
      {
        main: '의료',
        sub: '약사·한약사·약무보조',
      },
      {
        main: '의료',
        sub: '간호사',
      },
      {
        main: '의료',
        sub: '간호조무사',
      },
      {
        main: '의료',
        sub: '의료기사',
      },
      {
        main: '의료',
        sub: '사무·원무·코디',
      },
      {
        main: '의료',
        sub: '수의사·수의간호',
      },
      {
        main: '의료',
        sub: '의료직기타',
      },
      {
        main: '미디어',
        sub : '전체',
      },
      {
        main: '미디어',
        sub: '감독·연출·PD',
      },
      {
        main: '미디어',
        sub: '영상·사진·촬영',
      },
      {
        main: '미디어',
        sub: '광고제작·카피·CF',
      },
      {
        main: '미디어',
        sub: '아나운서·리포터·성우',
      },
      {
        main: '미디어',
        sub: '기자',
      },
      {
        main: '미디어',
        sub: '작가·시나리오',
      },
      {
        main: '미디어',
        sub: '연예·엔터테인먼트',
      },
      {
        main: '미디어',
        sub: '인쇄·출판·편집',
      },
      {
        main: '미디어',
        sub: '영화·배급',
      },
      {
        main: '미디어',
        sub: '음악·음향',
      },
      {
        main: '미디어',
        sub: '공연·전시·무대·스텝',
      },
      {
        main: '전문·특수직',
        sub : '전체',
      },
      {
        main: '전문·특수직',
        sub: '경영분석·컨설턴트',
      },
      {
        main: '전문·특수직',
        sub: '채권·심사·보험·보상',
      },
      {
        main: '전문·특수직',
        sub: '회계·세무·CPA',
      },
      {
        main: '전문·특수직',
        sub: '노무·헤드헌터·직업상담',
      },
      {
        main: '전문·특수직',
        sub: '리서치·통계·설문',
      },
      {
        main: '전문·특수직',
        sub: '도서관사서',
      },
      {
        main: '전문·특수직',
        sub: '법률·특허·상표',
      },
      {
        main: '전문·특수직',
        sub: '외국어·번역·통역',
      },
      {
        main: '전문·특수직',
        sub: '보안·경호',
      },
      {
        main: '전문·특수직',
        sub: '사회복지·요양보호·자원봉사',
      },
      {
        main: '전문·특수직',
        sub: '연구소·R&D',
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
