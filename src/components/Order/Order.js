import React from "react";
import "./Order.css";
import Aux from "../../hoc/Aux/Aux";
const Order = (props) => {
    let transformedIngredients = null;
    if (props.data && props.data.ingredients) {
        transformedIngredients = Object.keys(props.data.ingredients).map(
            (igKey) => {
                return (
                    <span key={igKey}>
                        <span
                            style={{
                                textTransform: "capitalize",
                                display: "inline-block",
                                margin: "0 8px",
                                border: "1px solid #ccc",
                                padding: "5px",
                            }}
                        >
                            {igKey}
                        </span>
                        : {props.data.ingredients[igKey]}
                    </span>
                );
            }
        );
    }

    let html = (
        <div className="Order">
            <p>Ingridents: {transformedIngredients}</p>
            <p>
                Price: <strong>USD {props.data.totalPrice}</strong>
            </p>
        </div>
    );

    return <Aux>{transformedIngredients ? html : null}</Aux>;
};

export default Order;
