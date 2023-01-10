/*
cypress run
utilizando npx cypress run en la consola de comandos
podemos correr todos los test sin necesidad de abrir la interfaz de
usuario

si corro npx cypress run corre todos los tests, sino puedo
mandarle cual ejecutar

podemos especificar el test que queremos correr indicando el 
path de nuestro test de la siguiente forma
--spec cypress/e2e/nombreDelArchivo.cy.js

Videos:
Al ejecutar npx Cypress run , cypress creara un video de forma
automatica de nuestros tests y los guardara en la carpeta "videos"


si vamos al packageJson agregamos el "currentTest" : "npx cypress run --spec 'cypress/e2e/clase-5-assertions.cy.js'"


las fotos las toma cuando hay un error. y graba siempre, haya o no haya un error


hay muchos reportes que podemos usar que estan en la pagina de cypress
nosotros vamos a usar el reporter de mocha 

npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator

y agregamos al config.js
reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  }

y agregamos --reporter mochawesome al commando line del package json (vamos a hacer uno nuevo que se llame report)
de aca se genera una carpeta results con nuestras asersiones y lo ppodemos abrir como un html al estilo robot framework

Screen shots (se puede tomar fotos cuando fallas el test y podemos setear un momento determinado tambien)
Cypress nos permite sacar fotos en un determinado momento al utilizar el metodo screenshot
permite sacar fotos a la pantalla completa o de un elemento en particular

dentro del it {
    cy.screenshot({capture:"fullPage"})
}


*/