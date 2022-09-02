export class onlineShopPage{
    constructor(){
        this.url = "home/onlineshop"
    }
    checkUrl(){
        cy.url().should('include',this.url)
    }

 

}