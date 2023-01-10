/*
    generar una suite de pruebas que nos permita probar casos negativos al momento de probar el login del sistema con datos
    generados en un archivo JSON

    el set de datos debe incluir: usuario,contraseña y mensaje de error
*/


/// <reference types="cypress"/>

describe('actividadComplementaria',()=>{
    let datosInvalidos;


    before('Before',()=>{
        cy.fixture("actividadComp4").then((data)=>{
            datosInvalidos=data;
        })
    })
    beforeEach('ingresar a la pagina',()=>{
        cy.visit('/')


    })
    it("ingresar con datos invalidos", () => {
        cy.get("#registertoggle").dblclick();
        cy.get("#user").type(datosInvalidos.usuario);
        cy.get("#pass").type(datosInvalidos.password);
        cy.xpath('//button[contains(text(),"Log in")]').click();
        cy.get('p').contains(`${datosInvalidos.errorMessage}`).should("have.text","Las credenciales son invalidas")

      });

})