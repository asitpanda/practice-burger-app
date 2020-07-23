import * as actionTypes from "../actions/actionTypes";

const intialState = {
    ingredients: null,
    totalPrice: 4,
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]:
                        state.ingredients[action.ingredientType] + 1,
                },
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICE[action.ingredientType],
            };
        }

        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]:
                        state.ingredients[action.ingredientType] - 1,
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICE[action.ingredientType],
            };
        }
        case actionTypes.SET_INGREDIENT: {
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
            };
        }
        default:
    }

    return state;
};

export default reducer;
