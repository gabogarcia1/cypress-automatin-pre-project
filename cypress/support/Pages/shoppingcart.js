export class ShoppingCart{
    constructor(){
        this.showTotalPrice= '//button[contains(text(),"Show total price")]',
        this.goToCheckOutButton = '//button[contains(text(),"Go to Checkout")]'

    }

    
    verificarNombreProducto(nombre){
        cy.xpath(`//p[@id="productName" and @name="${nombre}"]`).should("have.length",'1').and("have.text",`${nombre}`)
    }
    verificarPrecioProducto(nombre,precio){
        cy.xpath(`//p[@id="productName" and @name="${nombre}"]//following-sibling::p`).should("have.length",'1').and("have.text",`$${precio}`)
    }
    verificarPrecioTotal(precio){
        cy.xpath(this.showTotalPrice).click()
        cy.get("#price").invoke('text').then((secText)=>{
            assert.equal(secText,`${precio}`)
        })

    }

    goToCheckoutPage(){
        cy.xpath(this.goToCheckOutButton).click()
    }

}