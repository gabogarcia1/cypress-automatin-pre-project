describe('Actividad Complementaria : pasar desafio 1 a xpaths',()=>{
    it('Pasar desafio 1 a xpaths', () => {
        let randomNumber=Math.floor(Math.random()*1000)

        cy.visit("/");
        cy.xpath('//input[@name="user"]').type(`gabrielgarica${randomNumber}`)
        cy.xpath("//input[@id='pass']").type('Password1!')
        cy.xpath("//input[@value='Male']//following-sibling::span[text()='Male']").click()
        cy.xpath("//select[@id='day']").select('28')

        /* duda, aca quise usar esto
        //select[@id='day']//child::option[text()='28']
        pero solo ubicaba el elemento no lo seleccionaba y si le ponia .click() no lo hacia
        */
        cy.xpath("//select[@id='month']").select('February')
        cy.xpath("//select[@id='year']").select('1997')
        cy.xpath('//button[@type="submit"]').click()
        cy.xpath("//*[@id='todolistlink']").click()
        cy.xpath("//*[@name='task']").type('Primera tarea {enter}')
        cy.xpath("//*[@name='task']").type('Segunda tarea {enter}')
        cy.xpath("//*[contains(text(),'Primera tarea')]").click()
        cy.xpath("//*[contains(text(),'Primera tarea')]").should('have.css','text-decoration','line-through solid rgb(26, 32, 44)')
        cy.xpath("//*[contains(text(),'Segunda tarea')]").click()
        cy.xpath("//*[contains(text(),'Segunda tarea')]").should('have.css','text-decoration','line-through solid rgb(26, 32, 44)')

        cy.xpath("//*[contains(text(),'Primera tarea')]").click()
        cy.xpath("//*[contains(text(),'Primera tarea')]").should('have.css','text-decoration','none solid rgb(26, 32, 44)')
        cy.xpath("//*[contains(text(),'Segunda tarea')]").click()
        cy.xpath("//*[contains(text(),'Segunda tarea')]").should('have.css','text-decoration','none solid rgb(26, 32, 44)')
    });



})