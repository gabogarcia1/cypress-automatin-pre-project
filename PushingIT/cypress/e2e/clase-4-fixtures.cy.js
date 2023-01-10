/*
FIXTURES:
cuando queremos ingresar un diferente set de datos para probar nuestras pruebas podemos utilizar un archivo json para generar nuestro set de datos
son objetos json que tienen una key y el valor de la key

si o si se los crea dentro de las carpeta fixture no puede crearse en otra carpeta

para usar el archivo JSON en nuestro test primero debemos utilizar la funcion "cy.fixture" como en (1) y se lo hace siempre dentro del before
la palabra "then" captura la informacion del cy.fixture (que tiene un return) y la pone en una variable nueva


*/

describe("Fixture", () => {
  let datosLogin, registroData;
  let numberRandom;

  before("Before", () => {
    //(1)
    cy.fixture("loginData").then((data) => {
      datosLogin = data;
    });

    cy.fixture("registroData").then((data) => {
      registroData = data;
    });

   numberRandom = Math.floor(Math.random() * 1000);
  });

  beforeEach("Before Each", () => {
    cy.log("before each se esta ejecutando");
    cy.visit("/");
  });

  it("Registrarse correctamente", () => {
    cy.get("#user").type(registroData.usuario + numberRandom);
    cy.get("#pass").type(registroData.password);
    cy.xpath(
      `//input[@value='${registroData.gender}']//following-sibling::span[text()='${registroData.gender}']`
    ).click();
    cy.xpath("//select[@id='day']").select("28");
    cy.xpath("//select[@id='month']").select("February");
    cy.xpath("//select[@id='year']").select("1997");
    cy.xpath('//button[@type="submit"]').click();
    cy.get(`[id*="user_${registroData.usuario}"]`).should("be.visible");
  });

  it("ingresar con datos validos", () => {
    cy.get("#registertoggle").dblclick();
    cy.get("#user").type(datosLogin.usuario + numberRandom);
    cy.get("#pass").type(datosLogin.password);
    cy.xpath('//button[contains(text(),"Log in")]').click();
    cy.get(`[id*="user_${datosLogin.usuario}"]`).should("be.visible");
  });

});
