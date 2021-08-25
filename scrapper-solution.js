const puppeteer = require('puppeteer');

const chromiumOptions = {
  headless: true,
  defaultViewport: null,
  slowMo: 20
};

const siteData = {
  URL: 'https://www.bolsadesantiago.com/resumen_instrumento/SQM-B',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0'
};

async function scrapData() {
  // Launch Chromium and open a new tab
  const browser = await puppeteer.launch(chromiumOptions);
  const page = await browser.newPage();

  // Check user Agent
  // console.log(await browser.userAgent());      // It shows that we are in headless mode, must change that.

  // Set new User Agent <- Simple way to bypass Captcha
  /* The user agent that I selected is the one the one that my web navigator uses 
      (Search 'My useragent' in google) */
  await page.setUserAgent(siteData.userAgent);

  // Set new View Port <- Simple way to bypass Captcha
  /* The view port that I selected is the one the one that my web navigator uses 
      (Search 'My view port' in google) */
  await page.setViewport({
    width: 1279,
    height: 635,
    deviceScaleFactor: 1.5
  });

  // Open URL and wait for the site to load
  /* 
      As mentioned in documentation about waitUntil option:
      networkidle0 - consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
  */
  await page.goto(
    'https://www.bolsadesantiago.com/resumen_instrumento/SQM-B',
    { waitUntil: 'networkidle0' }
  );
  
  // Obtain whole HTML <- To check if reCaptcha is requested
  // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  // console.log(bodyHTML)

  // Obtain wanted element (hardcoded)
  let instrumentValue = await page.evaluate(() => {
    let matchedElementsFound = [];
    let elements = $('h4.text-muted.ng-binding').toArray(); // As in https://api.jquery.com/toArray/
    for (var element of elements)
        matchedElementsFound.push(element.textContent);
    return matchedElementsFound[0]; // First element represents instrument value (Hardcoded)
  });
  
  // Close Chromium
  await browser.close();

  return instrumentValue;
}

scrapData()
.then(instrumentValue => console.log(`El valor de la acción es de: CLP $${instrumentValue}`));