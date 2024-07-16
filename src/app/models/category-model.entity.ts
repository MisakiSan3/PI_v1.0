export interface CategoryModel {
    id: string;
    categoryName: string;
}

export interface CreateCategoryModel extends  Omit<CategoryModel, 'id'>{
}

export interface UpdateCategoryModel extends Partial<CategoryModel>{
    id: string;
}