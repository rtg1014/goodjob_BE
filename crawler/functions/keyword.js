async function getKeyword(page, len) {
  const keywords = '//@data-gainfo';
  await page.waitForXPath(keywords);
  const temp = await page.$x(keywords);
  let resultKD = [];
  let x;
  for (x of temp) {
    if (resultKD.length === len) break;
    const value = await x.evaluate((el) => el.textContent);
    const test = JSON.parse(value);
    resultKD.push(test.dimension44);
  }
  return resultKD;
}
module.exports = getKeyword;
