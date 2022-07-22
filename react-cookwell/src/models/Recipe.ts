export interface IRecipe {
    id: number;
    title: string;
    categories: number[];
    imageUrl: string;
    ingredients: string[];
    portions: number;
    preparationMethod: any;
    timeToPrepare: string;
  }