// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('registerUser',(username,password,gender,day,month,year)=>{
    cy.request({
        method: "POST",
        url: "https://pushing-it-backend.herokuapp.com/api/register",
        body : {
            "username" : username,
            "password": password,
            "gender": gender,
            "day": day,
            "month": month,
            "year": year,
        }
    }).then(respuesta =>{
        expect(respuesta.status).to.equal(200)
    })
})

Cypress.Commands.add('login',(username,password)=>{
    cy.request({
        method: "POST",
        url: "https://pushing-it-backend.herokuapp.com/api/login",
        body : {
            "username" : username,
            "password": password,
        }
    }).then(respuesta =>{
        expect(respuesta.status).to.equal(200)
        window.localStorage.setItem("token",respuesta.body.token)
        window.localStorage.setItem("user",respuesta.body.user.username)
    })
    cy.visit("/")
})

Cypress.Commands.add('deleteUser',(username)=>{
    cy.request({
        method: "DELETE",
        url: "https://pushing-it-backend.herokuapp.com/api/deleteuser/" + username.toLowerCase(),
    }).then(respuesta =>{
        expect(respuesta.status).to.equal(200)
    })
})

Cypress.Commands.add("esperaBarraDeCarga",()=>{
    cy.get("[role='progressbar']",{timeout:15000}).should("not.exist")
})