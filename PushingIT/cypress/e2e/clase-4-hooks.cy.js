/*
Los hooks son palabritas que nos ofrece mocha que nos permiten realizar acciones antes de que nuestro test arranque
beforeEach, se ejecuta antes de cada test y se repite nuevamente cada vez que se inicia un nuevo test
podemos ejecutar comandos como login, declarar variables por ejemplo si queremos buscar un producto de nuestro carrito de compras
podemos hacer una variable con el producto que queremos buscar en el carrito

si tenemos 5 tests el beforeeach se va a ejecutar 5 veces
eejmplo:

visitar url
ingresar al sistema 
obtener sesiones creadas 
setear las precondiciones

After each se ejecuta al finalizar cada test y se repite nuevamente cada vez que un test finaliza
resetear el estado de los datos/variables
finalizar reportes individuales
finalizar procesos inicializados por cada test


el before (all, solo se ejecuta una unica vez) me va a servir para realizar conexiones con la base de datos (con sql o con postman o con api rest o mongo db)
crear sesiones
configuracion del ambiente de pruebas
inicializar el set de datos que vamos a utilizar

el after me sirve para 

cerrar la conexion con la base de datos
cerrar la conexion con el ambiente
enviar reportes a los destinatarios


*/
/// <reference types="cypress"/>


describe('hooks',()=>{

    /*
        lo ideal es que siempre que iniciemos una variable, la iniciemos vacia dentro del describe
    ejemplo:
    */
    let usuario,password; /*si o si lo defino en el describe porque si lo defino dentro de la funcion before, no va a ser una variable global, no va a 
    funcionar en otra funcion
    */

    before('Before',()=>{
        cy.log('before all')
        usuario= 'pushingit'
        password='123456!'

    })

    beforeEach('Before Each',()=>{
        cy.log('before each se esta ejecutando')
        cy.visit('/')
        cy.get('#registertoggle').dblclick()
    })

    it('ingresar con datos validos', () => {
        cy.get('#user').type(usuario)
        cy.get('#pass').type(password)
        cy.xpath('//button[contains(text(),"Log in")]').click()
        cy.get(`[id*="user_${usuario}"]`).should("be.visible")


    });
    it('ingresar datos invalidos', () => {
        cy.get('#user').type(usuario)
        cy.get('#pass').type(password)
        cy.xpath('//button[contains(text(),"Log in")]').click()
        cy.get('p').contains('Las credenciales son invalidas').should("have.text","Las credenciales son invalidas")
    });

    afterEach('After each',()=>{
        cy.log('after each se ejecuta')
        password='1234567!'
    })

    after('after',()=>{
        cy.log('After all')
    })



})

