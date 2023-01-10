/// <reference types="cypress"/>

/*
Cypress usa chai y chai tiene dos tipos de asserciones diferentes.
BDD y TDD
BDD: se escriben sintacticamente para comprobar el comportamiento del caso de prueba (basadas en el comporamiento de la aplicacion)
  tenemos dos palabras claves, una es should y la otra es expect
  las bdd son un poco mas faciles de leer que las tdd

TDD: las asercionesde tipo TDD se escriben sintacticamente para comprobar el resultado del caso de prueba (basados en el test propiamente dicho)
esta es simplemente un assert.


describe('Assertions',()=>{
    it('BDD Assertions usando should',()=>{
        cy.get('#title').should('have.text',"Waits")
    })
    it('BDD Assertions usando Expect',()=>{

        cy.get('#title').invoke('text').then((secText)=>{
            expect(secText).is.equal("Waits")
        })

        // en este caso secText guarda la informacion que trajo invoke (lo mismo que cuando veiamos fixture)
    })
})

*/
describe("Esperas", () => {
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
  });

  it("Validar el titulo waits utilizando should BDD", () => {
    cy.get("#title").should("have.text", "Waits");
  });
  it("Validar el titulo waits utilizando expect BDD", () => {
    cy.get("#title").invoke('text').then((secText)=>{
        expect(secText).is.equal("Waits")
    })
  });
  it("Validar el titulo waits utilizando assert TDD", () => {
    cy.get("#title").invoke('text').then((secText)=>{
        assert.equal(secText,"Waits")
    })
  });

  it('Valida la cantidad de elementos cuya id es title', () => {
    cy.get("#title").should("have.length",'1')
    //have.lenght no representa la cantidad de caracteres, representa la cantidad de elementos cuyo id es title
    //ya que nunca hablamos del texto que tiene title
  });
  it('Valida la cantidad de caracteres que tiene el titulo', () => {
    cy.get("#title").invoke("text").should("have.length",'5')
    //have.lenght no representa la cantidad de caracteres, representa la cantidad de elementos cuyo id es title
    //ya que nunca hablamos del texto que tiene title
  });

  it('Valida la cantidad de caracteres que tiene el titulo usando expect', () => {
    cy.get("#title").invoke("text").then((titulo)=>{
        expect(titulo).to.have.length(4, "la cantidad de caracteres es invalida"); // solo para ver el mensaje
    })
  });

  it('Valida la cantidad de caracteres que tiene el titulo usando Assert', () => {
    cy.get("#title").invoke("text").then((titulo)=>{
    assert.lengthOf(titulo,5)   
    })
    
  });

  /*
  CREAR BUENAS ASERCIONES
  para crear buenas aserciones debemos asegurarnos que lo que estamos confirmando en la asercion es lo que realmente debemos esperar en nuestro
  caso de prueba

  UTILIZACION DE AND
  cypress nos ofrece la palabra reservada and para realizar mas de una asercion sobre el mismo elemento web y que quede mas legible y entendible nuestro
  caso de prueba 

  ejemplo 
  it('utilizando and',()=>{
    cy.get('#title').should('is.visible').and("have.text","waits")
  })



  */

  it('Valida la cantidad de elemento utilizando mas de una asercion AND', () => {
    // cy.get("#title").invoke('text').should("have.length",'5').and("have.text","Waits") cuando usamos invoke no podemos usar el and
    cy.get("#title").should("have.length",'1').and("have.text","Waits")
  });

  it('Valida que el button tenga el nombre wait', () => {
    cy.get("#wait").invoke("attr","name").should("equal","wait")
  });
  it('Valida que el button tenga el nombre wait expect', () => {
    cy.get("#wait").invoke("attr","name").then((nombre) =>{
        expect(nombre).equal("wait")
    })
  });

  it('Valida que el button tenga el nombre wait sin usar invoke', () => {
    cy.get("#wait").should("have.attr","name","wait")
  });

  

});
