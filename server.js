const express = require('express'),
    app = express();
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

app.get("/", async (request, response) => {
    try {
      const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  });
    // var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    // response.send(fullUrl);
    // response.send(request.params.id);
    // response.send(request.params.code);
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
    await page.focus('#iggid')
    await page.keyboard.type('1234')
    await page.focus('#cdkey_1')
    await page.keyboard.type('royal')
    const selector1 = '#btn_claim_1';
    await page.waitForSelector(selector1);
    await page.click(selector1);
    const selector2 = '#btn_msg_close';
    await page.waitForSelector(selector2);
    await page.click(selector2);
//     await page.locator('#iggid').fill('1234');
//     await page.locator('#cdkey_1').fill('royal');
//     await page.locator('#btn_claim_1').click();
//     await page.locator('#btn_msg_close').click();
    await page.screenshot({path:'puppeteer.png'});
    await browser.close();
//     response.sendFile(__dirname+'puppeteer.png');
  } catch (error) {
    console.log(error);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
