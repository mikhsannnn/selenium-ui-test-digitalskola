const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLogin(){
    //Membuat koneksi dengan Browser Driver
    let driver = await new Builder ().forBrowser('chrome').build();

    try {
        await driver.get("https://www.saucedemo.com");

        //Masukan username dan password
        await driver.findElement(By.id('user-name')). sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //clik button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastikan sudah didashboard dgn mencari judul "Swag Labs"
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs' ");

        //Memastikan kita di dashboard dgn mencari "Burger button"
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu button is not visible" );
        
        // Tambahkan product ke keranjang
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();

        //Cek dan Validasi keranjang
        await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
        
        let titleCart = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        assert.strictEqual(titleCart.includes('Your Cart'), true, "Title does not include 'Your Cart' ");

    } finally {
        await driver.quit();
    }
}


sauceDemoLogin();