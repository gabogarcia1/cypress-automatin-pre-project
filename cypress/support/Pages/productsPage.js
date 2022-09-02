export class ProductsPage{
    constructor(){
        this.url = "home/onlineshop"
        this.closeAddToCartButton = '//button[contains(text(),"Close")]'
        this.goToShoppingCartButton='//button[text()="Go to shopping cart"]'    }
    checkUrl(){
        cy.url().should('include',this.url)
    }
    clickOnAddToCart(product,precio){
        cy.xpath(`//button[text()='Add to cart' and @name=${precio} and @value="${product}"]`).click() 
        cy.xpath(this.closeAddToCartButton).click()
    }
    clickOnGoToShoppingCart(){
        cy.xpath(this.goToShoppingCartButton).click()
    }
 

}