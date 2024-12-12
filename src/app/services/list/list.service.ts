import { Injectable } from '@angular/core';
import { ListI } from 'src/app/models/list.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private storageKeyList = 'lists';

  constructor() {}

  async getList(): Promise<Array<ListI>> {
    const list = localStorage.getItem(this.storageKeyList);
    return list ? JSON.parse(list) : [];
  }

  async createList(list: ListI): Promise<ListI> {
    const lists = await this.getList();
    list.id = uuidv4(); // Generar un ID único
    lists.push(list);
    this.saveToStorage(lists);
    return list;
  }

  probarDatos(id: string, datalist: ListI){
    console.log('Datos recibidos: ');
    console.log("ID: ", id);
    console.log('Nombre: ', datalist);
  }

  async editList(id: string, updatedList: ListI): Promise<ListI> {
    console.log('Entra al metodo');
    const lists = await this.getList();

    const index = lists.findIndex((stat) => stat.id === id);
    if (index !== -1) {
      lists[index] = { ...lists[index], ...updatedList };
      this.saveToStorage(lists);
      return lists[index];
    }
    throw new Error('Lista no encontrado');
  }

  async deleteList(id: string): Promise<void> {
    const lists = (await this.getList()).filter((stat) => stat.id !== id);
    this.saveToStorage(lists);
  }

  private saveToStorage(Lists: Array<ListI>): void {
    localStorage.setItem(this.storageKeyList, JSON.stringify(Lists));
  }
 }



