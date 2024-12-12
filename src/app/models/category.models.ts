export interface CategoriesI{
  id: string;
  name: string;
  description: string;
  parentcategory?: string[];

}

export interface CategoriesChildI{
  id: string;
  name: string;
  parentcategory?: string[];
}
