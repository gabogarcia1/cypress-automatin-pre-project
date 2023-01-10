describe('localizando elementos con css Selector',()=>{

    it('Localizando elementos', () => {
        cy.visit("/");
        cy.get('button').should('exist'); //should es siempre un assert
        //Para localizar el input por sus atributos debemos utilizar "[nombreAtributo]='valordel atributo'"
        //ej : cy.get("[id='pass']").should('exist');

        //CssSelector reemplaza la opcion de seleccionar por atributoss usamos el # o el .
        cy.get("[id='user']").should('exist');
        cy.get("#user").should('exist');


        cy.get("input[id='user']").should('exist');
        cy.get("input#user").should('exist'); //busca todos los input que tenga el id user


        cy.get(".password").should('exist'); //no importa que tenga mas classes el password, con que tenga una class y sea unica la detecta

        //si quiero encadenar mas cosas (otra clase de contraseña y hasta su id) hago:

        cy.get(".password.chakra-input#pass").should('exist');

        //si no uso css selector esto NO anda si o si tengo que poner todas las clase
        //esto no funciona cy.get(class="chakra-input password css-1ekf6i8").should('exist');
        //esto SI funciona cy.get(class="chakra-input password").should('exist');

        //Cypress Config: colocar la Baseurl en el cypress config y de esa forma en visit solo ponemos /

    });

    it('Utilizando fin', () => {
        cy.visit("/");
         //.find me permite encontrar todos los tags que estan dentro de la etiqueta padre, puedo encontrar tooodos los elementos que estan dentro del form pero no los que estan fuera 
         cy.get('fieldset').find("[value='Male']")
    });

    it('Localizando Elementos por .Children', () => {
        //con children es siempre el siguiente elemento de forma obligatoria, no solo que este dentro sino que sea el hijo directo
        cy.visit("/");
       
         cy.get('#year').children("[value='1923']")

    });


    it('Localizando Elementos por .Parent', () => {
        //con children es siempre el siguiente elemento de forma obligatoria, no solo que este dentro sino que sea el hijo directo
        cy.visit("/");
       
         cy.get("[value='1923']").parent('#year')
    });

    //gabrielgarcia
    //Password1!

    it('Localizando Elementos por .Sibling', () => {
        //con children es siempre el siguiente elemento de forma obligatoria, no solo que este dentro sino que sea el hijo directo
        cy.visit("/");
       
         cy.get("#user").siblings('label')
    });

    it('Localizando Elementos por .contains', () => {
        //con children es siempre el siguiente elemento de forma obligatoria, no solo que este dentro sino que sea el hijo directo
        cy.visit("/");
        cy.get('button').contains('Register')
        cy.contains('Register')
        cy.contains('register',{matchCase:false})
        //Si no quiero que me importe la mayuscua y la minuscula hago
    });

    it.skip('Ubicar al nombre de usuario luego de loguearse que es dinamico', () => {
        let usuario ="gabrielgarcia"

        cy.visit("/");
        cy.get(`id=user_${usuario}_3`) //puedo localizarlo asi porque user_ y _3 son estaticos pero el usuario no

    });
    it('Ingresar un valor presionando enter', () => {
        cy.visit("/");
        cy.get('#user').type('usuario {enter}')
        cy.get('#user').clear
        let user = 'user'
        cy.get('#user').type(`${user} {enter}`)


    });

  


})