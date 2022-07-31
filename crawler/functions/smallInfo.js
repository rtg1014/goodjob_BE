const continueArr = require('../data/continueArr');

async function getSmallInfo(page, len) {
  const smallInfo =
    '//p[@class="etc"]/ancestor::div//div[@class="titBx"]/p[@class="etc"]/span[@class="cell"]';
  await page.waitForXPath(smallInfo);
  const temp = await page.$x(smallInfo);
  let resultCR = [];
  let resultAD = [];
  let a = '';

  let x;
  for (x of temp) {
    const value = await x.evaluate((el) => el.textContent);
    let valueTrim = value.replace(/ +/g, ' ');
    let pass = false;
    for (let i = 0; i < continueArr.length; i++) {
      if (valueTrim.includes(continueArr[i])) pass = true;
    }
    if (pass) continue;
    valueTrim = value.replace(/[0-9][년]+/g, '');
    valueTrim = valueTrim.replace('↑', '');
    valueTrim = valueTrim.replace('고졸', '');
    valueTrim = valueTrim.replace('초대졸', '');
    valueTrim = valueTrim.replace('대졸', '');
    valueTrim = valueTrim.replace('석사', '');
    valueTrim = valueTrim.replace('박사', '');
    valueTrim = valueTrim.replace('학력무관', '');
    if (valueTrim.indexOf('신입') === -1 && valueTrim.indexOf('경력') === -1) {
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

  const data = {
    resultCR,
    resultAD,
  };
  return data;
}
module.exports = getSmallInfo;
