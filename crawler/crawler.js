const { promises } = require('nodemailer/lib/xoauth2');
const puppeteer = require('puppeteer');

(async () => {
  console.info('start...');
  console.info('puppeteer', puppeteer);

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await Promise.all([
    await page.goto('https://www.jobkorea.co.kr/recruit/joblist?menucode=local&localorder=1'),
    await page.waitForNavigation(),
  ]);

  await page.click("#anchorGICnt_1 > li:nth-child(2) > button")


  await page.waitForTimeout(3000);
  await browser.close();
})();
