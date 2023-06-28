export enum INGREDIENT_TYPE {
  RAW = 'raw',
  PREPARED = 'prepared',
}

export class Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public type: INGREDIENT_TYPE
  ) {}
}
