/* aca basicamente creamos una clase y la exportamos
"creamos la abstraccion" de nuestra pagina de registro
*/
export class RegistroPage {

 constructor(){
    this.iniciarSesionButton = "#registertoggle"
 }   

clickIniciarSesionButton(){

    cy.get(this.iniciarSesionButton).dblclick();
}
}