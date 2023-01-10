describe('Primer suite de prueba',()=>{

    it('Primer test con mocha',()=>{
        cy.log('nuestro primer test')
    })
    /*
    Cypress es una herramienta Javascript de E2E testing que permite hacer testing en aplicaciones web asi como tambien microservicios
    (tambien permite hacer component testing pero es mas comun que se use para E2E)
    Nos permite hacer:
    - Web testing
    -Api Testing(nos permite hacer peticiones http, post get delete put)
    -Multiple Browsers
    -Ejecucion Oculta (puede hacerlo sin abrir el navegador)
    - Interfaz Propia
    -Amigable
    -Esperas Automaticas (4 segundos normalmente, los frameworks basados en selenium por ejemplo no usa esto)
    -Open Source

    cypress no corre test en paralelo 

    Interacciones en el dom (metodos que nos permiten interactuar con la web)
    .click()
    .type()
    .clear()
    .check/uncheck()
    .select() lista despegable


    podemos usar el seleccionador de cypress, y que nos diga un match si no, no nos sirve porque cypress no va a saber con que elemento interactuar
    */

})