// util
const { dateFormatter } = require('../../utils/util');

let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
let dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

async function getCompanyDate(page, len) {
  const companyDate = '//span[@class="date dotum"]//./text()';
  await page.waitForXPath(companyDate);
  const temp = await page.$x(companyDate);
  let resultCD = [];
  let x;
  for (x of temp) {
    if (resultCD.length === len) break;
    const value = await x.evaluate((el) => el.textContent);
    let valueTrim = value.trim();
    if (valueTrim.indexOf('~') > -1) {
      valueTrim =
        '2023-' + valueTrim.replace('~', '').replace('/', '-') + ' 23:59:59';
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

  return resultCD;
}
module.exports = getCompanyDate;
