export interface IGetHeroes {
  Total: number;
  Items: IItens[];
}

export interface IGetCategory {
  Id: number;
  Name: string;
}

export interface IRPostHeroes {
  Id: number;
  Name: string;
  Active: boolean;
  Category: null;
}

export interface ISPostHeroes {
  Name: string;
  CategoryId: number;
  Active: boolean;
}

export interface IUpdateHeroes {
  id?: number;
  Name: string;
  Category: number;
  Active: boolean;
}

interface IItens {
  Id: number;
  Name: string;
  Active: boolean;
  Category: ICategory;
}

interface ICategory {
  Id: number;
  Name: string;
}
