import React, { Component } from "react";
import "./Orders.css";
import * as actionTypes from "../../store/actions";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import { RootState, stateToProps } from "../../model/store";

interface DispatchProps {
    onFetchOrders: (userId: any, token: any) => void;
}

interface OwnProps {
    order: any;
}
type Props = stateToProps & DispatchProps & OwnProps;

export class Orders extends Component<Props> {
    componentDidMount() {
        this.props.onFetchOrders(this.props.userId, this.props.token);
    }

    render() {
        return (
            <div>
                {this.props.orders.map((order: any) => (
                    <Order data={order} key={order.id} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): stateToProps => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        onFetchOrders: (userId: string, token: string) =>
            dispatch(actionTypes.fetchOrders(userId, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
