export class RegistroPage {
    constructor(){
       this.iniciarSesionButton = "#registertoggle"
    }   
   
   clickIniciarSesionButton(){
       cy.get(this.iniciarSesionButton).dblclick();
   }
   registrarUsuario(usuario,password,gender,day,month,year){
    cy.registerUser(usuario,password,gender,day,month,year) 
   }
   borrarUsuario(usuario){
    cy.deleteUser(usuario)
   }
   }