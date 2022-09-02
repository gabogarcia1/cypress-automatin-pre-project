export class onlineShopPage{
    constructor(){
        this.url = "home/onlineshop"
        this.closeAddToCart = '//button[contains(text(),"Close")]'
    }
    checkUrl(){
        cy.url().should('include',this.url)
    }
    clickOnAddToCart(product,precio){
        cy.xpath(`//button[text()='Add to cart' and @name=${precio} and @value="${product}"]`).click() 
        cy.xpath(this.closeAddToCart).click()
    }
 

}