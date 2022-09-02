/// <reference types="cypress"/>

import { LoginPage } from "../support/Pages/loginPage";
import { RegistroPage } from "../support/Pages/registerPage";
import { HomePage } from "../support/Pages/homePage";
import { onlineShopPage } from "../support/Pages/onlineShopPage";

describe('Pre Entrega', () => {
  let datosLogin,productos;
  const loginPage= new LoginPage();
  const registerPage= new RegistroPage();
  const homePage = new HomePage();
  const onlineShop=new onlineShopPage();

  before('Set Up',()=>{
    cy.fixture("loginData").then(datos=>{
      datosLogin=datos;
    })
    cy.fixture("products").then(prods=>{
      productos=prods;
    })
  })
  beforeEach("Before Each",()=>{
    cy.visit("/");
    registerPage.clickIniciarSesionButton();
    loginPage.login(datosLogin.usuario,datosLogin.password);
  })

  it('Hacer click en show total price y verificar el precio acumulado de 2 productos', () => {
    homePage.clickOnlineShop()
    onlineShop.checkUrl()
    onlineShop.clickOnAddToCart(productos.PrimerProducto.nombre,productos.PrimerProducto.precio)
    onlineShop.clickOnAddToCart(productos.SegundoProducto.nombre,productos.SegundoProducto.precio)

  })
})