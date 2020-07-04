import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-order";
import Loader from "../../components/UI/Loader/Loader";

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        axiosInstance.get("/ingredient.json").then((response) => {
            this.setState({ ingredients: response.data });
        });
    }

    updatePurchaseState = (updateIngedients) => {
        let sum = Object.keys(updateIngedients)
            .map((igKey) => {
                return updateIngedients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngedients = {
            ...this.state.ingredients,
        };
        updateIngedients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updateIngedients });
        this.updatePurchaseState(updateIngedients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngedients = {
            ...this.state.ingredients,
        };
        updateIngedients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updateIngedients });
        this.updatePurchaseState(updateIngedients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const ordereDetail = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice.toFixed(2),
            customer: {
                address: {
                    name: "Assit test",
                    street: "Test street",
                    pin: "123456",
                },
                mailId: "asit@test.com",
            },
            deliveryMethod: "fastest",
        };
        axiosInstance
            .post("/orders.json", ordereDetail)
            .then((response) => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch((error) => {
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let modalContent = null;
        let burger = <Loader />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledData={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            modalContent = (
                <OrderSummary
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
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

export default BurgerBuilder;
