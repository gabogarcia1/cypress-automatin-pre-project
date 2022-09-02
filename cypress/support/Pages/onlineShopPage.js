export class onlineShopPage{
    constructor(){
        this.url = "home/onlineshop"
        this.addToCartButton = "//button[text()='Add to cart']"
    }
    checkUrl(){
        cy.url().should('include',this.url)
    }
    clickOnAddToCart(product,precio){
        cy.get(`//button[text()='Add to cart' and @name=${precio} and @value='${product}']`).click()
    }
 

}