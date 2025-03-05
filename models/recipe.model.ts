export interface Recipe {
    id: string,
    name: string,
    ingredientsId: string[],
    description: string,
    categoriesId: string[],
    time: number,
    origin: string
  }