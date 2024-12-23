const { Builder, By } = require ('selenium-webdriver')
const LoginPage = require ('./WebComponent/LoginPage');
const DashboardPage = require ('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/cartPage');
const assert = require ('assert');
const fs = require('fs');

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe ('Test Case 3', function () {
    this.timeout (40000);
    let driver;


    //Run setiap mulai test, satu kali saja paling awal
    before (async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });


    //Test Suite dimulai dengan apa, setiap melakukan test
    beforeEach (async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user','secret_sauce');
    });

    //Assertion atau Validasi 
    // it ('Login succesfully and verify dashboard', async function(){
    //     const dashboardPage = new DashboardPage(driver);
    //     const title = await dashboardPage.isOnDashboard();
    //     assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products')
    // });

    // Add to cart
    it('Add product to cart and validate', async function () {
        const dashboardPage = new DashboardPage(driver);
        const cartPage = new CartPage(driver);
      
        // Add product to cart
        const productName = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        const productName1 = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();
        const productName2 = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();
        await dashboardPage.addToCart(productName);
        await dashboardPage.addToCart(productName1);
        await dashboardPage.addToCart(productName2);

        // Navigate to cart
        const cartButton = await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]"));
        await cartButton.click();
      
        // Validate product in cart
        const cartTitle = await cartPage.isOnCart();
        assert.strictEqual(cartTitle, 'Your Cart', 'Expected to be on the cart page');
      });
      
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after (async function(){
        await driver.quit();
    });

});