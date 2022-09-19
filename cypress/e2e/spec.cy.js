/// <reference types="cypress"/>

import { LoginPage } from "../support/Pages/loginPage";
import { RegistroPage } from "../support/Pages/registerPage";
import { HomePage } from "../support/Pages/homePage";
import { ProductsPage } from "../support/Pages/productsPage";
import { ShoppingCart } from "../support/Pages/shoppingcart";
import { CheckoutPage } from "../support/Pages/checkoutPage";
import { PurchaseModal } from "../support/Pages/purchaseModal";

describe('Pre Entrega', () => {
  let datosUsuario,productos;
  const loginPage= new LoginPage();
  const registerPage= new RegistroPage();
  const homePage = new HomePage();
  const productPage=new ProductsPage();
  const shoppingCart=new ShoppingCart();
  const checkOutPage= new CheckoutPage();
  const purchaseModal = new PurchaseModal();

  before('Set Up',()=>{
    cy.fixture("userData").then(datos=>{
      datosUsuario=datos;
    })
    cy.fixture("products").then(prods=>{
      productos=prods;
    })
    
  })
  beforeEach("Crear usuario y loguarse",()=>{ 
    registerPage.registrarUsuario(datosUsuario.usuario,datosUsuario.password, datosUsuario.gender,datosUsuario.day,datosUsuario.month,datosUsuario.year)
    loginPage.login(datosUsuario.usuario,datosUsuario.password);
  })

  afterEach("Eliminar usuario creado",()=>{
    registerPage.borrarUsuario(datosUsuario.usuario)
  })

  it('Hacer click en show total price y verificar el precio acumulado de 2 productos', () => {
    homePage.clickOnlineShop();
    productPage.checkUrl();
    productPage.clickOnAddToCart(productos.PrimerProducto.nombre,productos.PrimerProducto.precio);
    productPage.clickOnAddToCart(productos.SegundoProducto.nombre,productos.SegundoProducto.precio);
    productPage.clickOnGoToShoppingCart();
    shoppingCart.verificarNombreProducto(productos.PrimerProducto.nombre)
    shoppingCart.verificarNombreProducto(productos.SegundoProducto.nombre)
    shoppingCart.verificarPrecioProducto(productos.PrimerProducto.nombre,productos.PrimerProducto.precio)
    shoppingCart.verificarPrecioProducto(productos.SegundoProducto.nombre,productos.SegundoProducto.precio)
    shoppingCart.verificarPrecioTotal(`${productos.PrimerProducto.precio + productos.SegundoProducto.precio}`)
    shoppingCart.goToCheckoutPage()
    checkOutPage.completeFirstName(datosUsuario.nombre)
    checkOutPage.completeLastName(datosUsuario.apellido)
    checkOutPage.completeCreditCardNumber(datosUsuario.creditCardNumber)
    checkOutPage.clickOnPurchase()
    purchaseModal.verificarNombre(datosUsuario.nombre, datosUsuario.apellido)
    purchaseModal.verificaProducto(productos.PrimerProducto.nombre)
    purchaseModal.verificaProducto(productos.SegundoProducto.nombre)
    purchaseModal.verificarCreditCard(datosUsuario.creditCardNumber)
    purchaseModal.verificarPrecioTotal(`${productos.PrimerProducto.precio + productos.SegundoProducto.precio}`)

    // checkOutPage.verificarDatosTicket(datosUsuario.apellido)
    // checkOutPage.verificarDatosTicket(productos.PrimerProducto.nombre)
    // checkOutPage.verificarDatosTicket(productos.SegundoProducto.nombre)
    // checkOutPage.verificarDatosTicket(datosUsuario.creditCardNumber)
    // checkOutPage.verificarDatosTicket(`${productos.PrimerProducto.precio + productos.SegundoProducto.precio}`)
  })
})