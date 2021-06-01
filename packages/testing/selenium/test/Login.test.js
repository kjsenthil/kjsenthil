require('geckodriver');
require('../../../hybrid-frontend/jest.config');
let webdriver = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');
const {  By,  until } = require('selenium-webdriver');
let driver = webdriver;
let Firefox_options = new firefox.Options();
let url;
let explicitwait = 10000;
jest.setTimeout(30000);


// executed before all 'tests' - used to initialise browser drivers capabilities
beforeAll(async () => {

  let capabilities = webdriver.Capabilities;
  switch (process.env.BROWSER) {

    // firefox capabilities
    case "firefox": {
      Firefox_options.addArguments('--headless');
      Firefox_options.addArguments('--disable-gpu');
      Firefox_options.addArguments('--window-size=1980,1200')
      capabilities = webdriver.Capabilities.firefox();
      //initialising firefox driver
      driver = await new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(Firefox_options)
        .withCapabilities(capabilities)
        .build();
      break;


    }
    //chrome capabilities
    case "chrome": {
      require("chromedriver");
      capabilities = webdriver.Capabilities.chrome();
      capabilities.set("chromeOptions", {
        args: [
          "--headless",
          "--no-sandbox",
          "--disable-gpu",
          "--window-size=1980,1200"
        ]
      });
      // initialising chrome driver
      driver = await new webdriver.Builder().forBrowser('chrome')
        .withCapabilities(capabilities)
        .build();
      break;
    }
  }
  url = process.env.URL;
});

// test to launch digital hybrid , login with invalid credentials
test("Digital Hybrid - login with invalid credentials", async () => {
  await driver.get(url);
  let username = await driver.wait(until.elementLocated(By.id('username')), explicitwait);
  username.sendKeys('fsdfsdfsdfk');
  let password = await driver.findElement(By.id('password'));
  await password.sendKeys('1111111');
  let login = await driver.findElement(By.css("button[data-testid='login']"));
  await login.click();
  driver.sleep(3000);
  let successmsg = driver.wait(until.elementLocated(By.xpath("//div[@class='MuiAlert-message']")), explicitwait);
  await successmsg.getText().then(async function (txt) {
    await expect(txt).toBe('Request failed with status code 404');
  });
  
});

// test to launch digital hybrid , login with fields left blank
test("Digital Hybrid - login with fields left blank", async () => {
  await driver.get(url);
  let login = await driver.findElement(By.css("button[data-testid='login']"));
  await login.click();
  driver.sleep(2000);
  let successmsg = driver.wait(until.elementLocated(By.xpath("//div[@class='MuiAlert-message']")), explicitwait);
  await successmsg.getText().then(async function (txt) {
    await expect(txt).toBe('Request failed with status code 400');
  });
  
});

// executes after all 'tests' have run , kills the browser driver
afterAll(async () => {
  await driver.quit();
});
