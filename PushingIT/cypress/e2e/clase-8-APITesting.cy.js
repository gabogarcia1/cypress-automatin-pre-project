/*
Como probar servicios rest con cypress
podemos hacer cualquier tipo de consulta, get post delete put, que son las mas conocidas

podemos colocar parametros, header body ,hacer queries,actualizaciones,subir imagenes y demas
ver los videos de como instalar json server
Pasos: abrir visual studio code
crear una nueva carpeta
iniciar un nuevo proyecto con npm init -y
instalar json-server-auth
npm install json-server-auth --save-dev
( si no funciona agregar : npm install express + npm install json-server) (mejor creo que si lo hacemos en otra carpeta)
para iniciar el servidor utilizar:  npx json-server-auth http://jsonplaceholder.typicode.com/db

documentacion 
https://github.com/typicode/json-server

Cy.request es un metodo de cypressque nos permite realizar peticiones http a un servidor
Ejemplo

it("Realizar una peticion http",()=>{
    cy.request("http://localhost:3000/posts").then((response)=>{
        expect(response.status).to.equal(200)
    })
})

QUERIES
it("Realizar una peticion HTTP",()=>{
    cy.request({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        qs: {
            id:1,
        },
    }).then((response)=>{
        cy.log(response.body)
        cy.log(response.headers)
    })

})

*/
/// <reference types="cypress"/>
describe("API testing ", () => {
  it("Primer test de api rest", () => {
    cy.request("http://localhost:3000/posts").then((respuest) => {
      cy.log(respuest.body);
      cy.log(respuest.header);
      //asercion
      expect(respuest.status).to.equal(200);
    });
  });
  it("Segunda Peticion", () => {
    cy.request({
      url: "http://localhost:3000/posts",
      method: "GET",
    }).then((respuest) => {
      //asercion
      expect(respuest.status).to.equal(200);
      cy.log(respuest.body);
    });
  });

  it("Tercera peticion con queries", () => {
    cy.request({
      url: "http://localhost:3000/posts",
      method: "GET",
      qs: {
        id: 5,
      },
    }).then((respuest) => {
      //asercion
      expect(respuest.status).to.equal(200);
      cy.log(respuest.body);
    });
  });
  it("Cuarta peticion con queries usando sort y order ", () => {
    cy.request({
      url: "http://localhost:3000/posts",
      method: "GET",
      qs: {
        _sort: "id",
        _order: "desc",
      },
    }).then((respuest) => {
      //asercion
      expect(respuest.status).to.equal(200);
      cy.log(respuest.body);
    });
  });
  it("Quinta peticion con queries usando start y end ", () => {
    cy.request({
      url: "http://localhost:3000/posts",
      method: "GET",
      qs: {
        _start: "20", //el 20 no es considerado, es como que considera el index del array
        _end: "30",
      },
    }).then((respuest) => {
      //asercion
      expect(respuest.status).to.equal(200);
      cy.log(respuest.body);
    });
  });
  it("sexta peticion con queries usando rangos ", () => {
    cy.request({
      url: "http://localhost:3000/posts",
      method: "GET",
      qs: {
        id_gte: "20", //el 20  es considerado porque aca me considera el ID no el index (si hago delete de 21 22 y 23 y tiro los queries de vuelta se nota mas, el anterior igual me trae 10 y este me trae 8)
        id_lte: "30",
      },
    }).then((respuest) => {
      //asercion
      expect(respuest.status).to.equal(200);
      cy.log(respuest.body);
    });
  });
  it("septima peticion con excluyendo resultado ", () => {
    cy.request({
      url: "http://localhost:3000/posts",
      method: "GET",
      qs: {
        id_ne: ["1", "2", "3"], //excluye todos los numeros dentro del array, si es solo un numero, no hace falta el array
      },
    }).then((respuest) => {
      //asercion
      expect(respuest.status).to.equal(200);
      cy.log(respuest.body);
    });
  });

  /* Peticiones POST
    Al realizar un peticion HTTP de tipo POST debemos añadir el body en nuestro objecto que le enviamos al metodo request
    */
  it("Realizar una peticion HTTP y enviar un nuevo POST", () => {
    const id = Math.floor(Math.random() * 1000);
    const userID = 3;
    const title = "Pushing IT";
    const body = "Curso Pushing IT";

    cy.request({
      method: "POST",
      url: "http://localhost:3000/posts",
      body: {
        userID: userID,
        id: id,
        title: title,
        body: body,
      },
    }).then((response) => {
      expect(response.status).to.equal(201); //201 cuando es un post aparentemente
      expect(response.body.id).to.equal(id);
      expect(response.body.title).to.equal(title);

      cy.log(response.body);
      cy.log(response.headers);
    });
  });

  it("Peticion POST utilizando Destructuring", () => {
    const id = Math.floor(Math.random() * 1000);
    const userID = 3;
    const title = "Pushing IT";
    const body = "Curso Pushing IT";

    cy.request({
      method: "POST",
      url: "http://localhost:3000/posts",
      body: {
        userID: userID,
        id: id,
        title: title,
        body: body,
      },
    }).then(({ body, status }) => {
      //traemos unicamente lo que nos importa que seria el body y el status y headers como objetos separados
      expect(status).to.equal(201); //201 cuando es un post aparentemente
      expect(body.id).to.equal(id);
      expect(body.title).to.equal(title);

      cy.log(headers);
    });
  });

  /*Headers
        para usar el headers tenemos que agregar al body, 
        headers: {'key':'valor'}

        para que me sirve? 
        en el header agregamos informacion sobre el tipo de datos qe estamos enviando

     */

  it("Peticion POST agregando headers", () => {
    const id = Math.floor(Math.random() * 1000);
    const userID = 3;
    const title = "Pushing IT";
    const body = "Curso Pushing IT";

    cy.request({
      method: "POST",
      url: "http://localhost:3000/posts",
      body: {
        userID: userID,
        id: id,
        title: title,
        body: body,
      },
      headers: { "Content-Type": "application/json" },
    }).then(({ body, status }) => {
      //traemos unicamente lo que nos importa que seria el body y el status y headers como objetos separados
      expect(status).to.equal(201); //201 cuando es un post aparentemente
      expect(body.id).to.equal(id);
      expect(body.title).to.equal(title);

      cy.log(headers);
    });
  });

  /*Peticiones PUT
    nos permite poder editar la informacion

    */
  it("Peticion PUT", () => {
    const id = 20;
    const userID = 3;
    const title = "Pushing IT";
    const body = "Curso Pushing IT";

    cy.request({
      method: "PUT",
      url: "http://localhost:3000/posts/" + id,
      body: {
        userID: userID,
        title: title,
        body: body,
      },
    }).then(({ body, status }) => {
      //traemos unicamente lo que nos importa que seria el body y el status y headers como objetos separados
      expect(status).to.equal(200);
      expect(body.id).to.equal(id);
      expect(body.title).to.equal(title);

      cy.log(headers);
    });
  });

  it("Peticion DELETE", () => {
    const id = 15; //eliminamos el usuario numero 15

    cy.request({
      method: "DELETE",
      url: "http://localhost:3000/posts/" + id,
    }).then(({ body, status }) => {
      //traemos unicamente lo que nos importa que seria el body y el status y headers como objetos separados
      expect(status).to.equal(200);
      expect(body.id).to.equal(id);
      expect(body.title).to.equal(title);

      cy.log(headers);
    });
  });

  /*
  vamos a hacer un put y al put encadenarle un delete
  */

  it("Peticion PUT y luego encadenar un delete", () => {
    const id = 54;
    const userID = 3;
    const title = "Pushing IT";
    const body = "Curso Pushing IT";

    cy.request({
      method: "PUT",
      url: "http://localhost:3000/posts/" + id,
      body: {
        userID: userID,
        title: title,
        body: body,
      },
    })
      .then((response) => {
        expect(response.status).to.equal(200); 
        expect(response.body.id).to.equal(id);
        expect(response.body.title).to.equal(title);

        cy.log(response.body);
        cy.log(response.headers);
      })
      .then((response) => {
        cy.request({
          method: "DELETE",
          url: "http://localhost:3000/posts/" + response.body.id,
        }).then(({status})=>{
            expect(status).to.equal(200)
        }).then(() =>{
            cy.request({
                method:"GET",
                url:"http://localhost:3000/posts/" + id,
                failOnStatusCode:false
            }).then(respuesta=>{
                expect(respuesta.status).to.equal(404)
            })
        })
      })
  });
 //usando el endpoint 
  it.only('Ingresar en pushing it utilizando request', () => {
    cy.request({
        method: "POST",
        url: "https://pushing-it-backend.herokuapp.com/api/login",
        body: {
            "username": "pushingit",
            "password": "123456!"
        }
    }).then(respuesta =>{
        // window.localStorage.setItem("token",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjI4MjExNTN9._pOQ4VZByKhduZZZzE7RE2HNE1XlGcuM9kVQ9iTRmBs')
        window.localStorage.setItem("token",respuesta.body.token)
        window.localStorage.setItem("user",respuesta.body.user.username)
    })
    cy.visit("/")
  });
});


/*Actividad complementaria
Crear un test que realice una peticion post que permita registrarte en el sistema de pushing it 
El body tiene las siguientes keys

Username, password, gender,year,month,day
todos los valores son string
el endpoint es 
https://pushing-it-back.herokapp.com/api/register


*/

