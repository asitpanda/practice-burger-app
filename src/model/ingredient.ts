import * as CONSTANT from "../common.constant";

export enum INGREDIENT {
    SALAD,
    CHEESE,
    MEAT,
    BACON,
}

// export var Ingridient_Name = CONSTANT.INGREDIENT.SALAD |  CONSTANT.INGREDIENT.BACON;

export const Ingridient_control = [
    { label: "Salad", type: CONSTANT.INGREDIENT.SALAD },
    { label: "Bacon", type: CONSTANT.INGREDIENT.BACON },
    { label: "Cheese", type: CONSTANT.INGREDIENT.CHEESE },
    { label: "Meat", type: CONSTANT.INGREDIENT.MEAT },
];
