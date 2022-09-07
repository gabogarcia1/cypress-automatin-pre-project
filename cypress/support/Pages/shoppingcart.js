export class ShoppingCart{
    constructor(){
        this.showTotalPrice= '//button[contains(text(),"Show total price")]'

    }

    
    verificarNombreProducto(nombre){
        cy.xpath(`//p[@id="productName" and @name="${nombre}"]`).should("have.length",'1').and("have.text",`${nombre}`)
    }
    verificarPrecioProducto(precio){
        cy.xpath(`//p[@id="productPrice" and @name="${precio}"]`).should("have.length",'1').and("have.text",`$${precio}`)
    }
    verificarPrecioTotal(precio){
        cy.xpath(this.showTotalPrice).click()
        cy.get("#price").invoke('text').then((secText)=>{
            assert.equal(secText,`${precio}`)
        })
    }

}