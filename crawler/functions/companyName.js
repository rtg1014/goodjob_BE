async function getCompanyName(page) {
  const companyName = '//div[@class="titBx"]/ancestor::tr/td/a';
  await page.waitForXPath(companyName);
  const temp = await page.$x(companyName);
  let resultCN = [];
  let x;
  for (x of temp) {
    const value = await x.evaluate((el) => el.textContent);
    const valueTrim = value.trim();
    resultCN.push(valueTrim);
  }
  const len = resultCN.length;
  const data = {
    resultCN,
    len,
  };
  return data;
}
module.exports = getCompanyName;
