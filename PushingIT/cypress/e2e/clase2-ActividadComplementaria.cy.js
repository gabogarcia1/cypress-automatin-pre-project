
//Actividad Complementaria
/*Encontrar todos los elementos input y buscarls de forma diferente. pueden usar cssSelectors o metodos de cypress */

describe('Clase 2 - Actividad Complementaria',()=>{
    it('Localizando primer elementos input', () => {
       cy.visit('/') 
    cy.get("input[name='user']")


    });
    it('Localizando segundo elementos input', () => {
        cy.visit('/')
        cy.get('label[for="pass"]').siblings("input[name='pass']")


    });
    it('Localizando tercero elementos input', () => {
        cy.visit('/')
        cy.get('span').contains('Male').siblings('input')


    });
    it('Localizando cuarto elementos input', () => {
        cy.visit('/')
        cy.get('div[role="radiogroup"]').find('input[value="Female"]')



    });
    it('Localizando quinto elementos input', () => {
        cy.visit('/')
        cy.get('div[role="radiogroup"]').find('input[value="Female"]').parent().siblings().children('input[value="Other"]')
    });

})