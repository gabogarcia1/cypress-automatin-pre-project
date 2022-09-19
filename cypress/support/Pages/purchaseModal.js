export class PurchaseModal{
    constructor(){
        this.name = '//p[@id="name"]'
        this.creditCard = '//p[@id="creditCard"]'
        this.totalPrice = '//p[@id="totalPrice"]'
    }
    verificarNombre(nombre,apellido)
    {
        cy.xpath(this.name).should('have.text',`${nombre} ${apellido} has succesfully purchased the following items`)
    }
    verificaProducto(producto)
    {
        cy.xpath(`//p[@id="${producto}"]`).should('have.length',1)
    }
    verificarCreditCard(creditCard){
        cy.xpath(this.creditCard).should('have.text',`${creditCard}`)
    }
    verificarPrecioTotal(precioTotal){
        cy.xpath(this.totalPrice).should('have.text',`You have spent $${precioTotal}`)
    }


}