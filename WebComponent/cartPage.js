const { By } = require('selenium-webdriver');

class CartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async isOnCart() {
    const cart = await this.driver.findElement(By.xpath("//span[@class='title']"));
    return cart.getText();
  }

  async addToCart(productName) {
    const productLocator = By.xpath("div[@class='inventory_list']");
    const addToCartButton = await this.driver.findElement(productLocator);
    await addToCartButton.click();
  }
}

module.exports = CartPage;


