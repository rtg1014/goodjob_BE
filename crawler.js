// modules
const puppeteer = require('puppeteer');
const { sequelize } = require('./models');
const { Op } = require('sequelize');

// models
const {
  Posting,
  Career,
  CompanyType,
  City,
  Job,
  posting_job,
} = require('./models');

// util
const { dateFormatter } = require('./utils/util');

// 만료 데이터 삭제
const destroying = require('./destroying')
destroying()

let len = 0;
let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
let dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
let resultCN = [];
let resultTT = [];
let resultCR = [];
let resultAD = [];
let resultCD = [];
let resultKD = [];
let resultURL = [];
let item;
let temp;

(async () => {
  console.info('start');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--window-size=1920,1080'],
    slow: 3,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1000,
  });

  await Promise.all([
    page.goto(
      'https://www.jobkorea.co.kr/recruit/joblist?menucode=local&localorder=1'
    ),
    page.waitForNavigation(),
  ]);

  let target = "//span[text()='대기업']/ancestor::button";
  await page.waitForXPath(target);
  let s = await page.$x(target);
  s = s[0];

  await Promise.all([await s.click(), page.waitForNavigation()]).then(
    nextPage()
  );

  async function nextPage() {
    targetCategory =
      '//div[@class="tplSltBx tplGiSlt devTplSltBx"]/select[@name="orderTab"]';
    await page.select('select[name="orderTab"]', '등록일순');

    let numofpage = 2;
    do {
      let targetPage = `//a[@href="/recruit/_GI_List?Page=${numofpage}"]`;
      await page.waitForXPath(targetPage);
      let aaa = await page.$x(targetPage);
      aaa = aaa[0];
      console.log(`it is page ${numofpage}!`);
      await companyName();
      await Promise.all([
        await aaa.evaluate((e) => e.click()),
        page.waitForNavigation(),
      ]);

      numofpage++;
    } while (len);
    console.log('크롤링 완료!');
    process.exit(0);
  }

  //-----------------------------------------------------------------------------------------

  // 회사 이름
  async function companyName() {
    let companyName = '//div[@class="titBx"]/ancestor::tr/td/a';
    await page.waitForXPath(companyName);
    temp = await page.$x(companyName);
    resultCN = [];
    for (item of temp) {
      const value = await item.evaluate((el) => el.textContent);
      let valueTrim = value.trim();
      resultCN.push(valueTrim);
    }
    len = resultCN.length;

    await title();
  }

  //   공고제목
  async function title() {
    let title = '//div[@class="titBx"]/ancestor::td/div/strong/a';
    await page.waitForXPath(title);
    temp = await page.$x(title);

    resultTT = [];

    for (let i = 0; i < len; i++) {
      const value = await temp[i].evaluate((el) => el.textContent);
      let valueTrim = value.trim();
      resultTT.push(valueTrim);
    }

    await smallInfo();
  }

  //   경력, 학력, 근무지 등
  async function smallInfo() {
    let smallInfo =
      '//p[@class="etc"]/ancestor::div//div[@class="titBx"]/p[@class="etc"]/span[@class="cell"]';
    await page.waitForXPath(smallInfo);
    temp = await page.$x(smallInfo);
    resultCR = [];
    resultAD = [];
    let a = '';

    for (item of temp) {
      const value = await item.evaluate((el) => el.textContent);
      let valueTrim = value.replace(/ +/g, ' ');
      if (
        valueTrim.indexOf('외\n') !== -1 ||
        valueTrim.indexOf('정규직') !== -1 ||
        valueTrim.indexOf('계약직') !== -1 ||
        valueTrim.indexOf('인턴') !== -1 ||
        valueTrim.indexOf('파견직') !== -1 ||
        valueTrim.indexOf('도급') !== -1 ||
        valueTrim.indexOf('프리랜서') !== -1 ||
        valueTrim.indexOf('아르바이트') !== -1 ||
        valueTrim.indexOf('연수생') !== -1 ||
        valueTrim.indexOf('병역특례') !== -1 ||
        valueTrim.indexOf('위촉직') !== -1 ||
        valueTrim.indexOf('만원') !== -1 ||
        valueTrim.indexOf('사원급') !== -1 ||
        valueTrim.indexOf('팀원') !== -1 ||
        valueTrim.indexOf('주임') !== -1 ||
        valueTrim.indexOf('대리') !== -1 ||
        valueTrim.indexOf('과장') !== -1 ||
        valueTrim.indexOf('차장') !== -1 ||
        valueTrim.indexOf('부장') !== -1 ||
        valueTrim.indexOf('임원') !== -1 ||
        valueTrim.indexOf('CEO') !== -1 ||
        valueTrim.indexOf('팀장') !== -1 ||
        valueTrim.indexOf('매니저') !== -1 ||
        valueTrim.indexOf('실장') !== -1 ||
        valueTrim.indexOf('파트장') !== -1 ||
        valueTrim.indexOf('그룹장') !== -1 ||
        valueTrim.indexOf('본부장') !== -1 ||
        valueTrim.indexOf('센터장') !== -1 ||
        valueTrim.indexOf('지점장') !== -1 ||
        valueTrim.indexOf('지사장') !== -1 ||
        valueTrim.indexOf('원장') !== -1 ||
        valueTrim.indexOf('국장') !== -1 ||
        valueTrim.indexOf('공장장') !== -1 ||
        valueTrim.indexOf('~') !== -1 ||
        valueTrim.indexOf('(') !== -1
      )
        continue;
      valueTrim = value.replace(/[0-9][년]+/g, '');
      valueTrim = valueTrim.replace('↑', '');
      valueTrim = valueTrim.replace('고졸', '');
      valueTrim = valueTrim.replace('초대졸', '');
      valueTrim = valueTrim.replace('대졸', '');
      valueTrim = valueTrim.replace('석사', '');
      valueTrim = valueTrim.replace('박사', '');
      valueTrim = valueTrim.replace('학력무관', '');
      if (
        valueTrim.indexOf('신입') === -1 &&
        valueTrim.indexOf('경력') === -1
      ) {
        if (valueTrim.length) {
          a += ' ';
          a += valueTrim;
        }
      } else {
        if (valueTrim.indexOf('·') > -1) valueTrim = '경력무관';
        if (
          valueTrim.indexOf('경력') > -1 &&
          valueTrim.indexOf('신입') === -1 &&
          valueTrim.indexOf('무관') === -1
        )
          valueTrim = '경력';
        resultCR.push(a.split(' ')[0]);
        if (
          a.split(' ')[2] === undefined ||
          a.split(' ')[2] === '전지역' ||
          a.split(' ')[2] === '중국전지역'
        )
          resultAD.push(a.split(' ')[1] + ' 전체');
        else resultAD.push(a.split(' ')[1] + ' ' + a.split(' ')[2]);
        a = valueTrim;
        if (resultCR.length > len) break;
      }
    }
    resultCR.splice(0, 1); // 배열의 0번째 인덱스인 빈 값 삭제
    resultAD.splice(0, 1); // 배열의 0번째 인덱스인 빈 값 삭제

    await companyDate();
  }

  // 채용공고 날짜
  async function companyDate() {
    let companyDate = '//span[@class="date dotum"]//./text()';
    await page.waitForXPath(companyDate);
    temp = await page.$x(companyDate);
    resultCD = [];
    for (item of temp) {
      if (resultCD.length === len) break;
      const value = await item.evaluate((el) => el.textContent);
      let valueTrim = value.trim();
      if (valueTrim.indexOf('~') > -1) {
        valueTrim =
          '2022-' + valueTrim.replace('~', '').replace('/', '-') + ' 23:59:59';
      } else if (valueTrim.indexOf('(') > -1) continue;
      else if (valueTrim.indexOf('오늘') > -1) {
        valueTrim = dateFormatter(today).substr(0, 10) + ' 23:59:59';
      } else if (valueTrim.indexOf('내일') > -1) {
        valueTrim = dateFormatter(tomorrow).substr(0, 10) + ' 23:59:59';
      } else if (valueTrim.indexOf('모레') > -1) {
        valueTrim = dateFormatter(dayAfterTomorrow).substr(0, 10) + ' 23:59:59';
      } else valueTrim = '2122-01-01 00:00:00';

      resultCD.push(valueTrim);
    }

    await getURL();
  }

  // url
  async function getURL() {
    let keywords = '//div[@class="titBx"]//a/@href';
    await page.waitForXPath(keywords);
    temp = await page.$x(keywords);
    resultURL = [];
    for (item of temp) {
      if (resultURL.length === len) break;
      const value = await item.evaluate((el) => el.textContent);
      const fullValue = 'https://www.jobkorea.co.kr' + value;
      resultURL.push(fullValue);
    }

    await Keywords();
  }

  // 채용공고 키워드 목록
  async function Keywords() {
    let keywords = '//@data-gainfo';
    await page.waitForXPath(keywords);
    temp = await page.$x(keywords);
    resultKD = [];

    for (item of temp) {
      if (resultKD.length === len) break;
      const value = await item.evaluate((el) => el.textContent);
      let test = JSON.parse(value);
      resultKD.push(test.dimension44);
    }

    /*========================DB========================*/
    //  🎇db 삽입 부분🎇
    for (let i = 0; i < len; i++) {
      const t = await sequelize.transaction();
      try {
        let career = await Career.findOne({
          where: { type: resultCR[i] },
        });

        let companyType = await CompanyType.findOne({
          where: { type: '대기업' },
        });

        let city;

        city = await City.findOne({
          where: {
            [Op.and]: [
              { main: resultAD[i].split(' ')[0] },
              { sub: resultAD[i].split(' ')[1] },
            ],
          },
        });

        let [post, created] = await Posting.findOrCreate({
          where: {
            companyName: resultCN[i],
            title: resultTT[i],
            deadline: resultCD[i],
            url: resultURL[i],
            companyTypeId: companyType.id,
            careerId: career.id,
            cityId: city.id,
          },
        });

        if (!created) throw new error();

        let jobSub = resultKD[i].split(',');
        for (let j = 0; j < jobSub.length; j++) {
          let job = await Job.findOne({
            where: { sub: jobSub[j] },
          });

          await posting_job.create(
            {
              postingId: post.id,
              jobId: job.id,
            },
            { transaction: t }
          );
        }
        await t.commit();
      } catch (error) {
        await t.rollback();
        console.log('크롤링 완료');
        process.exit(0);
      }
    }
  }
})();
