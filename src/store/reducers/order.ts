import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const fetchOrdersStart = (state: any, action: any) => {
    return {
        ...state,
        loading: true
    }
};

const fetchOrdersSuccess = (state: any, action: any) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    }
};

const fetchOrdersFail = (state: any, action: any) => {
    return {
        ...state,
        loading: false
    }
};

const reducer = (state = initialState, action: any) => {
    switch (action.type)
    {
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default reducer;