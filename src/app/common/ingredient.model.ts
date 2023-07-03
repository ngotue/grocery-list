export enum INGREDIENT_TYPE {
  RAW = 'raw',
  PREPARED = 'prepared',
}

//TODO : add unit: gr, cup, tsp, tbsp,...
export class Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public type: INGREDIENT_TYPE
  ) {}
}
