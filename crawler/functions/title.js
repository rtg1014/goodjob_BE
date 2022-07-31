async function getTitle(page, len) {
  const title = '//div[@class="titBx"]/ancestor::td/div/strong/a';
  await page.waitForXPath(title);
  const temp = await page.$x(title);

  let resultTT = [];

  for (let i = 0; i < len; i++) {
    const value = await temp[i].evaluate((el) => el.textContent);
    const valueTrim = value.trim();
    resultTT.push(valueTrim);
  }

  return resultTT
}
module.exports = getTitle;
