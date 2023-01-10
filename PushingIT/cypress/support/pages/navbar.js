export class Navbar{
   
    verificarUsuario(usuario){
        cy.get(`[id*="user_${usuario}"]`).should("be.visible")
        //el asterisco es para que inicie de esa manera o era el ^ no se 
    }
}
