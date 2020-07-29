export interface RootState {
    burger: {
        ingredients?: any;
        totalPrice?: number;
        building?: boolean;
    };
    order: any;
    auth: any;
}

export interface stateToProps {
    ings?: any;
    totalPrice?: any;
    orders?: any;
    loading?: boolean;
    isAuthenticated?: boolean;
    token?: string;
    userId?: string;
}