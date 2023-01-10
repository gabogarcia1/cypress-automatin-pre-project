/*
  Esperas
  cy.wait
  defaulCommandTimeout:5000, en config

  wait: esto no es una buena practica ya que muchas veces estariamos esperando mas tiempo del necesario por nuestro elemento y los test
  se ralentizarian
    
  timeouts: al buscar un elemento podemos agregar un parametro que se llama timeout lo que nos permite aumentar el tiempo de espera
  unicamente para ese elemento y ademas en caso de encontrarlo antes, cypress va automaticamente detener la espera y continuar con el test 


  Actividad complementaria: crear un total de 3 casos de prueba del modulo waits de nuestra app donde esperemos por elementos que tardan en aparecer 
  utilizando aserciones BDD y TDD

  */


  describe('Esperas',()=>{
    let datosLogin;

    before("Before", () => {
      //(1)
      cy.fixture("loginData").then((data) => {
        datosLogin = data;
      });
    });
  
    beforeEach("Before Each", () => {
      cy.log("before each se esta ejecutando");
      cy.visit("/");
      cy.get("#registertoggle").dblclick();
      cy.get("#user").type(datosLogin.usuario);
      cy.get("#pass").type(datosLogin.password);
      cy.xpath('//button[contains(text(),"Log in")]').click();
      cy.get(`[id*="user_${datosLogin.usuario}"]`).should("be.visible");
      cy.get("a#waitslink").click();
      cy.get("[name='wait']").dblclick();
    });

    it('espera ESTATICA por el mensaje',()=>{
        cy.wait(10000) //mala practica, porque vamos a continuar esperando aunque el texto ya este en pantalla 
        cy.get('#message').should("have.text","You have waited for ten seconds, CONGRATULATIONS")
      })
      it('espera DINAMICA por el mensaje usando timeout',()=>{
        cy.get('#message',{timeout:10000}).should("have.text","You have waited for ten seconds, CONGRATULATIONS")
      })
      it('Esperar que la mascara de carga desaparezca', () => {
        //cy.get("[role='progressbar']",{timeout:10001}).should("not.be.visible") //no funciona porque no es que deja de ser visible sino que deja de existir
        cy.get("[role='progressbar']",{timeout:10000}).should("not.exist")
        cy.get('#message').should("exist")
      });
      it('espera DINAMICA por el mensaje usando timeout y validando por el color', () => {
     
        cy.get('#message',{timeout:10000}).should("have.css","color","rgb(0, 0, 0)")

        cy.get('#message',{timeout:15000}).should("have.css","color","rgb(51, 255, 255)")
        cy.get('#message').should("exist")
      });
      it('espera DINAMICA por el mensaje usando timeout y validando por el color', () => {
        cy.get('#message',{timeout:15000}).invoke("text").then(texto=>{
            expect(texto).to.equal("You have waited for ten seconds, CONGRATULATIONS") //si le pongo el segundo texto no funciona porque el invoke 
            //despues del timeout espera que exista un text pero no sabe cual, entonces me corta el test a los 10 segundos en vez de a los 15
            //tendria que agregarle un should have text despues del timeput y antes del invoke
            
        })
      });
      it('Esperar que la barra de carga no exista utilizando commands', () => {
        cy.esperaBarraDeCarga()
        cy.get('#message').should('exist')
      });



  })
  