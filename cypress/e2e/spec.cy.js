/// <reference types="cypress"/>

import { LoginPage } from "../support/Pages/loginPage";
import { RegistroPage } from "../support/Pages/registerPage";
import { HomePage } from "../support/Pages/homePage";
import { ProductsPage } from "../support/Pages/productsPage";
import { ShoppingCart } from "../support/Pages/shoppingcart";

describe('Pre Entrega', () => {
  let datosLogin,productos;
  const loginPage= new LoginPage();
  const registerPage= new RegistroPage();
  const homePage = new HomePage();
  const productPage=new ProductsPage();
  const shoppingCart=new ShoppingCart();

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
    homePage.clickOnlineShop();
    productPage.checkUrl();
    productPage.clickOnAddToCart(productos.PrimerProducto.nombre,productos.PrimerProducto.precio);
    productPage.clickOnAddToCart(productos.SegundoProducto.nombre,productos.SegundoProducto.precio);
    productPage.clickOnGoToShoppingCart();
    shoppingCart.verificarNombreProducto(productos.PrimerProducto.nombre)
    shoppingCart.verificarNombreProducto(productos.SegundoProducto.nombre)
    shoppingCart.verificarPrecioProducto(productos.PrimerProducto.precio)
    shoppingCart.verificarPrecioProducto(productos.SegundoProducto.precio)
    shoppingCart.verificarPrecioTotal(`${productos.PrimerProducto.precio + productos.SegundoProducto.precio}`)
  })
})