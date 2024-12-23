const { By } = require ('selenium-webdriver')

class DashboardPage {
    constructor(driver){
        this.driver = driver;
    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }
    async addToCart(productName) {
        const productLocator = By.xpath("//div[@class='inventory_container']");
        const addToCartButton = await this.driver.findElement(productLocator);
        await addToCartButton.click();
      }
      
}

module.exports = DashboardPage;