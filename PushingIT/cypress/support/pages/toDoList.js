export class TodoListPage{
    constructor(){
        this.taskInput= "#task"
        this.sendTaskButton= "//button[@id='sendTask']";
    }
    escribirTarea(tarea){
        cy.get(this.taskInput).type(tarea)
    }
    clickSendButton(){
        cy.xpath(this.sendTaskButton).click()
    }
    completarTarea(tarea){
        cy.contains(tarea).click();
    }
    eliminarTarea(tarea){
    cy.contains(tarea).siblings().click();

    }
}