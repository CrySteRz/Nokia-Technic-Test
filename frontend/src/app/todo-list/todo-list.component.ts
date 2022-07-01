import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ItemModel } from 'src/models/item.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() public itemList = [];
  @Output() public deleteItem = new EventEmitter();
  @Output() public deleteItemAll = new EventEmitter();
  @Output() public updateItem = new EventEmitter();
  itemObj : ItemModel = new ItemModel();
  editItemValue : string = '';
  closeModal: string = '';
  
  constructor(private modalService: NgbModal) {}
  public onClickDelete(item : any): void {
  this.deleteItem.emit(item.id); // emitem un eveniment care contine id-ul itemului ce il vom sterge
  }
  public onClickDeleteAll(): void {
    this.deleteItemAll.emit(); // emitem un eveniment care contine id-ul itemului ce il vom sterge
    }
    public onClickUpdate(): void {
      this.itemObj.name = this.editItemValue;
      this.updateItem.emit(this.itemObj); // emitem un eveniment care contine itemul ce il vom updata
    }
  
    call(item : ItemModel) {
      this.itemObj = item;
      this.editItemValue = item.name;
    }
    triggerModal(content : any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }


}
