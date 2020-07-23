import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";
interface OwnProps {
    ingredients: any;
    cancelHandler: () => void;
    continueHandler: () => void;
}

const CheckoutSummary = (props: OwnProps) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancelHandler}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.continueHandler}>
                CONTINUE
            </Button>
        </div>
    );
};

export default CheckoutSummary;
