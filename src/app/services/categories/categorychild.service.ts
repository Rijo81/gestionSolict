import { Injectable } from '@angular/core';
import { CategoriesChildI } from 'src/app/models/category.models';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CategorychildService {

  private storageKey = 'categoriesChild';

  constructor() {}

  async getCategoriesChild(): Promise<Array<CategoriesChildI>> {
    const categoriesChild = localStorage.getItem(this.storageKey);
    return categoriesChild ? JSON.parse(categoriesChild) : [];
  }

  async createCategoryChild(categoryChild: CategoriesChildI): Promise<CategoriesChildI> {
    const categoriesChild = await this.getCategoriesChild();
    categoryChild.id = uuidv4(); // Generar un ID único
    categoriesChild.push(categoryChild);
    this.saveToStorage(categoriesChild);
    return categoryChild;
  }

  async editCategoryChild(id: string, updatedCategoryChilde: CategoriesChildI): Promise<CategoriesChildI> {
    console.log('Entra al metodo');
    const categoriesChild = await this.getCategoriesChild();
    const index = categoriesChild.findIndex((cat) => cat.id === id);
    if (index !== -1) {
      categoriesChild[index] = { ...categoriesChild[index], ...updatedCategoryChilde };
      this.saveToStorage(categoriesChild);
      return categoriesChild[index];
    }
    throw new Error('Categoria no encontrada');
  }

  async deleteCategoryChild(id: string): Promise<void> {
    const categoriesChild = (await this.getCategoriesChild()).filter((cat) => cat.id !== id);
    this.saveToStorage(categoriesChild);
  }

  private saveToStorage(categoriesChild: Array<CategoriesChildI>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(categoriesChild));
  }
}
