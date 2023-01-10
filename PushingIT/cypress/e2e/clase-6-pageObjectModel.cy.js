import { HomePage } from "../support/pages/homePage";
import { LoginPage } from "../support/pages/loginPage";
import { Navbar } from "../support/pages/navbar";
import { RegistroPage } from "../support/pages/registerPage";
import { TodoListPage } from "../support/pages/toDoList";


/*
Page Object Model:
es un patro nde diseño que se utiliza en pruebas automatizadas para evitar codigo duplicado y mejorar el mantenimiento de las mismas
es para darle un diseño a nuestro framework y tenga una estructura mas formal

beneficios: 
evita codigo duplicado
facil de escribir
facil de entender
facil de mantener
puede ser reutilizado 
nombres de metodos mas realistas

es basicamente hacer una abstraccion del registro ( o de una pagina cualquiera) con sus metodos y sus variables
y lo vamos a hacer todo dentro de support, voy a crear una carpeta que se llame pages y ahi pongo la pagina de registro
*/


describe('POM',()=>{
    let datosLogic;
    const registroPage = new RegistroPage()
    const loginPage = new LoginPage()
    const navbar = new Navbar()
    const todoList = new TodoListPage()
    const homepage= new HomePage()

    /* ¿porque hacemos la instancia de la clase en el describe?
    para que este disponible para todos los tests
    
    */

    before("Before",()=>{
        cy.fixture("loginData").then(datos=>{
            datosLogic=datos;
        })
    })

    beforeEach("Before Each",()=>{
        cy.visit("/")
        registroPage.clickIniciarSesionButton()
        // loginPage.escribirUsuario(datosLogic.usuario)
        // loginPage.escribirPassword(datosLogic.password)
        // loginPage.clickLoginButton();
        loginPage.login(datosLogic.usuario,datosLogic.password)
        // cy.get(`[id*="user_${datosLogic.usuario}"]`).should("be.visible")
        navbar.verificarUsuario(datosLogic.usuario)
    })

    it('escribir 2 tarea y borrar la segunda y completar la primera', () => {
        homepage.clickTodoListLink()
        todoList.escribirTarea("Tarea 1");
        todoList.clickSendButton()
        todoList.escribirTarea("Tarea 2");
        todoList.clickSendButton()
        todoList.eliminarTarea("Tarea 2")
        todoList.completarTarea("Tarea 1")
    });

})
/*
Actividad complementaria
agregar metodos para interactuar con los botones All, completed y active de la pagina todo list

modificar el desafio 2 para que el mismo utilice pageObjectModel utilizando univamanete una clase para las tareas (ignoras la pagina de home, login y registro)

*/

/*
PRE ENTREGA
8/septiembre
requisitos. 
nuevo proyecto y unico
contar con unas baseURL
debera poder iniciarse colocando npm test
utilizar fixtures
hooks before y beforeeach
una clase diferente para cada pagina que utilicen
utilizar css selectors y xpaths

test:
ingresar en la pagina de pushing it
ingresar al sistema con datos validos
dirigirse al modulo "online shop"
elegir 2 productos a eleccion y añadirlos al carrito
verificar el nombre y precio de los dos productos
hacer click en "show total price" y verificar el precio acumulado de 
    los dos productos


-todo debera ser realizado en un unico archivo en una unica instancia de test (un unico it)
en un archivo fixture deberan colocar el producto que quieren elegir con su precio y su nombre para luego utilizarlo para comprobar nombre y precio en el carrito de compras
en total seran 2 fixtures
1. para el login usuario y contraseña
2. fixtures para los productos (nombre y precio)

*/