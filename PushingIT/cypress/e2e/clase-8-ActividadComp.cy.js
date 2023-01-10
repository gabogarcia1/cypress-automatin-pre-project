 /// <reference types="cypress"/>


 it('crear un test que realice una peticion post que permita registrar', () => {
    let user="pushingit123"
    cy.request({
        url: "https://pushing-it-backend.herokuapp.com/api/register",
        method: "POST",
        body:{
            username: "pushingit123",
            password:"123456!",
            gender:"male",
            year:"2022",
            month:"9",
            day:"1"
        }
    }).then((respuesta)=>{
        expect(respuesta.status).to.equal(200)
        expect(respuesta.body.Newuser.username).equal(user)
    })
 });

 /*
 preguntas entrevista:
  que protocolos conoces? soap y rest, cuales la diferencia
rest podes trabajar con html , xml y json 
los protocolos soap son muchos mas seguros, se usan en telecomunicaciones bancos y demos 
 

rest se usa con protocolo http para ecommerce desarrollo web y eso porque es mucho mas rapido y mas facil de leer y entender
que tipo de http code conoces, post put delete get patch head, que tipo de respuestas conoces, 100 (informacion) 200 (status code caso positivo) 300 (redirecciones) 400 (errores del lado del cliente) y 500 (son errores del lado del servidor)

que diferencia al get del post
post necesita un header y un body

para que se usa el signo de pregunta en get? para hacer queries y poner parametros
 
diferencia entre put y patch
put, tenemos que editar todas las variables, todas las keys del documento
si hacemos patch podemos modificar algunas ,sin la necesidad de modificar todo el cuerpo de nuestro documento

*/