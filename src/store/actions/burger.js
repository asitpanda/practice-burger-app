import * as ationTypes from "./actionTypes";

export const addIngredient = (name) => {
    return {
        type: ationTypes.ADD_INGREDIENT,
        ingredientType: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: ationTypes.REMOVE_INGREDIENT,
        ingredientType: name,
    };
};

export const setIngredient = (ingredients) => {
    return {
        type: ationTypes.SET_INGREDIENT,
        ingredients: ingredients,
    };
};
