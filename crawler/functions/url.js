async function getUrl(page, len) {
  const keywords = '//div[@class="titBx"]//a/@href';
  await page.waitForXPath(keywords);
  const temp = await page.$x(keywords);
  let resultUrl = [];
  let x;
  for (x of temp) {
    if (resultUrl.length === len) break;
    const value = await x.evaluate((el) => el.textContent);
    const fullValue = `https://www.jobkorea.co.kr${value}`;
    resultUrl.push(fullValue);
  }

  return resultUrl;
}
module.exports = getUrl