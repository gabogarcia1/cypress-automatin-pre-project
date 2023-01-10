  /*Desafio:
    ingresar a url
    completar el registro
    ingresar en la seccion to do list
    ingresar una nueva tarea 
    ingresar una nueva tarea
    completar la tarea clickeando en la misma
    */


 /// <reference types="cypress"/>

 describe('Desafio 1',()=>{
    it('Desafio',()=>{
      let randomNumber=Math.floor(Math.random()*1000)

      cy.visit("/");
      cy.get('#user').type(`gabrielgarica${randomNumber}`);
      cy.get('#pass').type(`Password1!`);
      cy.get("input[value='Male']").siblings().eq(0).click();
      cy.get('#day').select('28')
      cy.get('#month').select('February')
      cy.get('#year').select('1997')
      cy.get('button[type="submit"]').click()
      cy.get('#todolistlink').click()
      cy.get('[name="task"]').type('Primera tarea{enter}')
      cy.get('[name="task"]').type('Segunda tarea{enter}')
      cy.contains('Primera tarea').click()
      cy.contains('Primera tarea').should('have.css','text-decoration','line-through solid rgb(26, 32, 44)')
      cy.contains('Segunda tarea').click()
      cy.contains('Segunda tarea').should('have.css','text-decoration','line-through solid rgb(26, 32, 44)')
      cy.contains('Primera tarea').click()
      cy.contains('Primera tarea').should('have.css','text-decoration','none solid rgb(26, 32, 44)')
      cy.contains('Segunda tarea').click()
      cy.contains('Segunda tarea').should('have.css','text-decoration','none solid rgb(26, 32, 44)')

    })

 })