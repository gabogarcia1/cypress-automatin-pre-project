/// <reference types="cypress"/>
/*
$ npm install cypress-xpath --save-dev

No es recomendable usar clases, sino atributos con el valor
xpaths: 
 es una manera diferente de localizar elementos. hay dos, relativos y absoluto
Absoluto:es la forma directa de encontrar elementos, pero la desventaje del xpath absoluto es que si se realizan
cambios en la ruta del elemento ese xpath falla
toma el arbol completo del elemento web y tenemos que iniciar desde el comienzo,desde html hasta que lleguemos al input correspondiente, y es medio
una paja
/html/body/div[1]/div/div/div/div/form/div[1]/input
para sacar eso, voy al elements, click derecho en el elemento que quiero seleccionar y pongo copy fullxpath
NUNCA deberiamos usar xpath absolutos, solo lo vemos de forma practica

xpath relativo:
la ruta xpath relativa comienza desde el medio de la estructura HTML DOM. comienza con la barra diagonal doble (//), lo que significa que puede buscar
el elemento en cualqui lugar de la pagina web.

//tagname[@atributo='valor'] --> muy parecido a css selector pero al atributo se le pone un @ antes

no hace falta que empecemos desde html sino que lo podemos hacer desde cualquier parte de nuestro arbol de elementos

diferencias entre absoluto y relativo:
los dos llegan al mismo sitio pero el absoluto empieza desde html cuando el relativo lo puedo arrancar desde cualquier lado

ejemplo  (para hacer el relativo mas preciso)
//form/div/input[@id='user']

no se recomienda el absoluto, porque si se agrega un div o cualquier cosa dentro del html todo el xpath absoluto va a cambiar

absoluto arranca con / (una barra)
relativo arranca con // (dos barras)

en vez de  la etiqueta (tagname) podemos poner un * y eso toma que puede ser cualquier tagname

localizando elementos usando contains (con css selector no buscamos elementos por su texto):
teniendo el boton registrate

ejemplo: //label[contains(@id,'label')]  ---> el primer parametro del metodo contains para xpath, es el atributo y el segundo es el valor del atributo
y busca los atributos que tengan el texto 'label'.
podemos dar otro ejemplo de contains:
//input[contains(@class,'password')]  --> de esta forma solo busco el elemento que tenga la palabra "password en su clase"

otro ejemplo si quiero buscar el h2 que dice mi nombre de usuario la clase tiene mi nombre de usuario y un numero random que se genera de forma arbitraria
entonces me costaria hacer un css selector de ese h2 que dice welcome usuario

//h2[contains(@class,'usuario')] 



*/


describe('clase3',()=>{
it('localizar elementos con xpaths usando contains', () => {
    cy.visit('/')
    cy.xpath("//input[contains(@class,'password')]")

    cy.xpath("//input") //me trae 5 inputs

    //localizando con xpath y luego filtrando con cssselector
    cy.xpath("//input").get('#user') //me trae el elemento usuario
    
});

/*Operadores logicos

teniendo el cuenta el input de user
podemos usar and or y not 

"//input[@atributo='user' and/or @atributo2='user']"
"//input[@id='user' and @name='user']"

xpaths tiene una mayor facilidad para buscar elementos, no es lo ideal que usemos xpaths con cypress pero no pasa naranja
*/

it('Localizar elementos con xpath utulizando el operador logico and not or', () => {
    cy.visit('/')
    cy.xpath('//input[@id="user" and @name="user"]')

    cy.xpath('//input[@id="user" or @name="user"]')
    cy.xpath('//input[@id="user" and not(@name="pass")]')

});

/*Starts-with method
solamente busca como comienza el valor del atributo

"//button[starts-with(@atributo,'valor parcial')]"

*/

it('Localizar elementos con xpath utilizando starts with', () => {
    cy.visit('/')
    cy.xpath("//*[starts-with(@id,'us')]")
});

it('Localizar elementos con xpath utilizando metodo text', () => {
    cy.visit('/')
    cy.xpath("//button[text()='Register']")

    cy.xpath("//*[text()='Iniciá sesión']")

});

it('Localizar elementos con xpath combinando metodo text y contains', () => {
    cy.visit('/')
    cy.xpath("//*[contains(text(),'Iniciá sesión')]")
});

it('Localizar elementos con xpath combinando metodo text y starts-with', () => {
    cy.visit('/')
    cy.xpath("//*[starts-with(text(),'Iniciá')]")
});
/* Utilizas descendant

para localizar el button utilizando descendant debemos utilizar //tagname//descendant::tagname
descendant vendria a ser como un children en cypress
sibling parent y eso son funciones de cypress no es css selector


*/
it('Localizar elementos con xpath por descendant', () => {
    cy.visit('/')
    cy.xpath("//div[@role='group']//descendant::option[text()='5']")
});

/* Utilizas ancestor

ancestor hace exactamente lo mismo pero en sentido opuesto


*/
it('Localizar elementos con xpath por ancestor', () => {
    cy.visit('/')
    cy.xpath("//option[text()='5']//ancestor::div[@role='group']")
    
});


/* Utilizas child
es lo mismo que hacerlo con el children de css selector
*/
it('Localizar elementos con xpath por child', () => {
    cy.visit('/')
    cy.xpath("//select[@id='day']//child::option[text()='5']")
    
});

/* Utilizas Parent
es lo mismo que hacerlo con el parent de css selector
*/
it('Localizar elementos con xpath por parent', () => {
    cy.visit('/')
    cy.xpath("//option[text()='5']//parent::select[@id='day']")
    
});
/* Utilizas sibling
es lo mismo que hacerlo con el sibling de css selector

aca hay dos metodos uno para buscar al hermano que esta por arriba y otro para buscar al hermano que esta por debajo
following-sibling
preceding-sibling


funciona sin que ponga -sibling (lo puedo probar en la consola), pero si pongo following solamente busca como por fuera de su familia, no se lo usa
mucho asi

*/
it.only('Localizar elementos con xpath por preceding sibling', () => {
    cy.visit('/')
    cy.xpath('//input[@id="user"]//preceding-sibling::label')
    
});

it.only('Localizar elementos con xpath por following sibling', () => {
    cy.visit('/')
    cy.xpath('//label[@for="user"]//following-sibling::input')
    
});
/*
actividad complementaria
pasar todo mi desafio a xpaths



*/



})