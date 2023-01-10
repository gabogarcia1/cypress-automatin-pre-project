/// <reference types="cypress" />


// la idea de la clase de hoy es poder acceder a los componentes y modificar su estado sin la necesidad de usar el navegador 
/*
porque actions? nos permite modificar el estado de la pagina sin necesidad de interactuar con la interfez del usuario
esto se debe a que la arquitectura de cypress nos permite interactuar con la aplicacion que estamos testeando

esto nos beneficia en que los test se hacen mas rapido. y tienen menos posibilidades de fallar los tests porque no interactuo con la web


si buscamos page object model cypress en google. 
la primera pagina nos dice, "DEJA DE USAR POM Y EMPEZA A USAR ACTIONS" . es un nuevo patron de diseño como screen play o actions que resuelven ciertos problemas que tiene POM

podemos verificar los componentes de nuestra aplicacion en la consola de desarrollador pongo en la consola, window.app

podemos modificar el estado de la pagina cambiando el estado de los elementos de la siguiente forma 

window.app.showLoginModule = true

ejectura actiones en cypress
it("deberia mostrar en la consola la infor de la app",()=>{
    cy.window().then(({app})=>{
        cy.log(app)
    }
})

*/

describe("actiones",()=>{
    let loginData,loginComponent,appComponent,tareas,boardCollectionComponent;
    before('Deberia reiniciar la base de datos',()=>{
        cy.request({
            method:"DELETE",
            url:"http://localhost:3000/api/users"
        }).then((respuesta)=>{
            expect(respuesta.status).equal(204)
        })
        cy.fixture("userActions").then(data=>{
            loginData=data;
        })
        cy.fixture("tareaAction").then(data=>{
            tareas=data;
        })
    })
    beforeEach("Ingresar a la url y acceder a los componentes",()=>{
        cy.visit("http://localhost:3000/")
        cy.component("root").then(component =>{
            appComponent = component
        })
        cy.component("Login").then(component =>{
            loginComponent = component
        })
        cy.component("board-collection").then(component =>{
            boardCollectionComponent = component
        })



    })
    xit("deberia mostrar en la consola la infor de la app",()=>{

            // cy.log(app)
            appComponent.showLoginModule = true;
         loginComponent.loginCardActive =false;   
         loginComponent.signUpCardActive =true; 
         //hasta ahora solo accedimos a los elementos
         //ahora accedemos a los metodos
    
    })
   it("deberia registrarse utilizando actions",()=>{
            // cy.log(app)
            appComponent.showLoginModule = true;
         loginComponent.loginCardActive =false;   
         loginComponent.signpCardActive =true; 
         //hasta ahora solo accedimos a los elementos
         //ahora accedemos a los metodos
         loginComponent.signupEmail = loginData.user
         loginComponent.singupPassword = loginData.password
         loginComponent.signup()
         cy.wait(5000)

    })
    it("deberia ingresar utilizando actions",()=>{
            // cy.log(app)
            appComponent.showLoginModule = true;

         //hasta ahora solo accedimos a los elementos
         //ahora accedemos a los metodos
         loginComponent.loginEmail = loginData.user
         loginComponent.loginPassword = loginData.password
         loginComponent.login()
         cy.wait(5000)

    })
    it.only('act complementaria - deberia ingresar al sistema e ingresar tarea nueva', () => {
        appComponent.showLoginModule = true;
        loginComponent.loginEmail = loginData.user
        loginComponent.loginPassword = loginData.password
        loginComponent.login()      
        appComponent.showLoginModule = false;

        boardCollectionComponent.newBoardInputActive= true
        boardCollectionComponent.newBoardTitle= tareas.tarea
        boardCollectionComponent.createNewBoard()

    });
})