// modules
const puppeteer = require('puppeteer');

//functions
const destroying = require('./functions/destroying');
const getCompanyName = require('./functions/companyName');
const getTitle = require('./functions/title');
const getSmallInfo = require('./functions/smallInfo');
const getCompanyDate = require('./functions/companyDate');
const getUrl = require('./functions/url');
const InsertData = require('./functions/dataInsert');
const getKeyword = require('./functions/keyword');

let length;

// 만료 데이터 삭제
destroying();

(async () => {
  console.info('start');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--window-size=1920,1080'],
    slow: 3,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // 우분투에서 puppeteer 실행
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

  await Promise.all([await s.click(), page.waitForNavigation()]).then(start());

  async function start() {
    await page.select('select[name="orderTab"]', '등록일순');

    let numofpage = 2;
    do {
      let targetPage = `//a[@href="/recruit/_GI_List?Page=${numofpage}"]`;
      await page.waitForXPath(targetPage);
      let nextPage = await page.$x(targetPage);
      nextPage = nextPage[0];
      console.log(`it is page ${numofpage}!`);
      const { resultCN, len } = await getCompanyName(page);
      length = len;
      const resultTT = await getTitle(page, len);
      const { resultCR, resultAD } = await getSmallInfo(page, len);
      const resultCD = await getCompanyDate(page, len);
      const resultUrl = await getUrl(page, len);
      const resultKD = await getKeyword(page, len);
      await InsertData(
        len,
        resultCN,
        resultTT,
        resultCR,
        resultAD,
        resultCD,
        resultUrl,
        resultKD
      );

      await Promise.all([
        await nextPage.evaluate((e) => e.click()),
        page.waitForNavigation(),
      ]);

      numofpage++;
    } while (length);
    console.log('크롤링 완료!');
    process.exit(0);
  }
})();
