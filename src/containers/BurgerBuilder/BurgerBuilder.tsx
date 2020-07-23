import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-order";
import Loader from "../../components/UI/Loader/Loader";
import * as actionTypes from "../../store/actions/index";
import { connect } from "react-redux";
import { RootState, stateToProps } from "../../model/ingredient";
import { RouteComponentProps } from "react-router-dom";

interface DispatchProps {
    addIngredient: (data: string) => void;
    removeIngredient: (type: string) => void;
    setIngredient: (type: string) => void;
}

interface OwnProps {
    purchasing: boolean;
    loading: boolean;
}

type Props = stateToProps & DispatchProps & OwnProps & RouteComponentProps;

class BurgerBuilder extends Component<Props> {
    state = {
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        axiosInstance.get("/ingredient.json").then((response: any) => {
            this.props.setIngredient(response.data);
        });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let modalContent = null;
        let burger = <Loader />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabledData={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.totalPrice > 4}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            modalContent = (
                <OrderSummary
                    price={this.props.totalPrice}
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />
            );
        }

        if (this.state.loading) {
            modalContent = <Loader />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {modalContent}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state: any): any => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addIngredient: (type: string) =>
            dispatch(actionTypes.addIngredient(type)),
        removeIngredient: (type: string) =>
            dispatch(actionTypes.removeIngredient(type)),
        setIngredient: (data: RootState) =>
            dispatch(actionTypes.setIngredient(data)),
    };
};

export default connect<DispatchProps & OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(BurgerBuilder);
