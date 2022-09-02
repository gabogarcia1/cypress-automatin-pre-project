/// <reference types="cypress"/>

import { LoginPage } from "../support/Pages/loginPage";
import { RegistroPage } from "../support/Pages/registerPage"
describe('Pre Entrega', () => {
  let datosLogin;
  const loginPage= new LoginPage();
  const registerPage= new RegistroPage();

  before('Set Up',()=>{
    cy.fixture("loginData").then(datos=>{
      datosLogin=datos;
    })
  })
  beforeEach("Before Each",()=>{
    cy.visit("/");
    registerPage.clickIniciarSesionButton();
    loginPage.login(datosLogin.usuario,datosLogin.password)
  })

  it('Hacer click en show total price y verificar el precio acumulado de 2 productos', () => {
    
  })
})