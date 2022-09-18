export class CheckoutPage{
    constructor(){
        this.firstName = "[name=firstName]",
        this.lastName = "[name=lastName]",
        this.cardNumber = "[name=cardNumber]",
        this.goToCheckOutButton = '//button[contains(text(),"Purchase")]',
        this.progressBar = "[role='progressbar']"
    }

    completeFirstName(name){
        cy.get(this.firstName).type(name)
    }
    completeLastName(name){
        cy.get(this.lastName).type(name)
    }
    completeCreditCardNumber(number){
        cy.get(this.cardNumber).type(number)
    }
    clickOnPurchase(){
        cy.xpath(this.goToCheckOutButton).click()
        cy.esperaBarraDeCarga()
    }
    
    verificarDatosTicket(dato)
    {
        cy.contains(dato).should('have.length',1)
    }

}