export class HomePage{
    constructor(){
        this.todolistlink="#todolistlink"
        this.waislink="#waitslink"
        this.alertslink="#waitslink"
        this.formUtilsLink="#formutilslink"
        this.onlineshoplink="#onlineshoplink"
        this.fileuploadlink="#fileuploadlink"
    }

    clickTodoListLink(){
        cy.get(this.todolistlink).click()
    }

}