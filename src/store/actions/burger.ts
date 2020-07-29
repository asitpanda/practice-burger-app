import * as ationTypes from "./actionTypes";

export const addIngredient = (name: string) => {
    return {
        type: ationTypes.ADD_INGREDIENT,
        ingredientType: name,
    };
};

export const removeIngredient = (name: string) => {
    return {
        type: ationTypes.REMOVE_INGREDIENT,
        ingredientType: name,
    };
};

export const setIngredient = (ingredients: any) => {
    return {
        type: ationTypes.SET_INGREDIENT,
        ingredients: ingredients,
    };
};
