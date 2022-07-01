import { Component, Output, EventEmitter } from "@angular/core";


@Component({
    selector: "todo-input",
    templateUrl : "./todo-input.component.html"
})
export class TodoInputComponent{
    public inputText : string = "";
    @Output() public addItem = new EventEmitter();

    public onClickAdd(): void {
        this.addItem.emit(this.inputText);
        this.inputText = "";
    }

}
