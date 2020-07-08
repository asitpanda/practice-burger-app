import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-order";
import Loader from "../../components/UI/Loader/Loader";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        axiosInstance.get("/ingredient.json").then((response) => {
            this.setState({ ingredients: response.data });
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (type) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientType: type,
            }),
        removeIngredient: (type) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientType: type,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
