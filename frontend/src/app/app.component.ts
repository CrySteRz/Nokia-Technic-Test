import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'exerciutiuAC';
  public items: any = []; // aici tinem lista de items care vor fi afisate in todo list

  public constructor(private todoService: TodoService) {
    // am injectat TodoService
    // nimic altceva de facut in constructor
  }

  public ngOnInit(): void {
    this.todoService.getItemList().subscribe((response) => {
      this.items = response; // raspunsul contine lista de items
                             // fiecare item are forma { id: number, name: string } 
    });
  }
  public onCreateItem(newItemName: string): void {
    this.todoService.createItem({todo: newItemName}).subscribe((response: any) => {
      this.items.push({name: newItemName, id: response.id}); // cand requestul a fost facut cu succes si am primit raspunsul, push-uim itemul in lista impreuna cu id-ul din raspuns
                                                             // o alta varianta ar fi sa facem refresh la toata lista cu getItemList(). 
    });
  }
  public onDeleteItem(itemId : any): void {
    this.todoService.deleteItem(itemId).subscribe(() => {
      this.items = this.items.filter((item : any) => item.id != itemId); // cand requestul a fost facut cu succes si am primit raspunsul, stergem itemul din lista
    });
  }
  public onDeleteItemAll(): void {
    this.todoService.deleteItemAll().subscribe(() => {
      this.items = []; // cand requestul a fost facut cu succes si am primit raspunsul, stergem toata lista
    }
    );
  }
  public onUpdateItem(item: any): void {
    this.todoService.updateItem(item).subscribe(() => {
      this.items = this.items.map((item : any) => item.id == item.id ? item : item); // cand requestul a fost facut cu succes si am primit raspunsul, updatam itemul din lista
    }
    );
  }
}
