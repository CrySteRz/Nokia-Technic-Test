import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemModel } from 'src/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly BASE_API_URL = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  //request pentru toata lista de todo-uri
  public getItemList(): Observable<any> {
    return this.http.get(this.BASE_API_URL + "todo/");
  }

  // request pentru crearea de todo item
  public createItem(todo: any): Observable<any> {
    return this.http.post(this.BASE_API_URL + "todo/", todo);
  }

  //request pentru stergerea unui todo pe baza de ID
   public deleteItem(todoId : any): Observable<any> {
  return this.http.delete(this.BASE_API_URL + "todo/" + todoId);
  }
  public deleteItemAll(): Observable<any> {
    return this.http.delete(this.BASE_API_URL + "todo/");
    }
  //request pentru updatarea unui todo pe baza de ID
  public updateItem(todo: ItemModel): Observable<any> {
    return this.http.put(this.BASE_API_URL + "todo/" + todo.id, todo);
  }

}
