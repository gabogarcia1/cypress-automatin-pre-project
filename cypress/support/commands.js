Cypress.Commands.add('registerUser',(username,password,gender,day,month,year)=>{
    cy.request({
        method: "POST",
        url: "https://pushing-it.onrender.com/api/register",
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
        url: "https://pushing-it.onrender.com/api/login",
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
        url: "https://pushing-it.onrender.com/api/deleteuser/" + username.toLowerCase(),
    }).then(respuesta =>{
        expect(respuesta.status).to.equal(200)
    })
})

Cypress.Commands.add("esperaBarraDeCarga",()=>{
    cy.get("[role='progressbar']",{timeout:15000}).should("not.exist")
})