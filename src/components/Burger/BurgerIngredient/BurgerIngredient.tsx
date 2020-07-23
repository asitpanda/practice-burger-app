import React, { Component } from "react";
import PropTypes from "prop-types";
import * as CONSTANT from "../../../common.constant";
import "./BurgerIngredient.css";

interface OwnProps {
    type: String;
}

class BurgerIngredient extends Component<OwnProps> {
    static propTypes = {
        type: PropTypes.string.isRequired,
    };
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case "bread-bottom":
                ingredient = <div className="BreadBottom"></div>;
                break;
            case "bread-top":
                ingredient = (
                    <div className="BreadTop">
                        <div className="Seeds1"></div>
                        <div className="Seeds2"></div>
                    </div>
                );
                break;
            case CONSTANT.INGREDIENT.MEAT:
                ingredient = <div className="Meat"></div>;
                break;
            case CONSTANT.INGREDIENT.CHEESE:
                ingredient = <div className="Cheese"></div>;
                break;
            case CONSTANT.INGREDIENT.SALAD:
                ingredient = <div className="Salad"></div>;
                break;
            case CONSTANT.INGREDIENT.BACON:
                ingredient = <div className="Bacon"></div>;
                break;
            default:
                ingredient = <div>No Data</div>;
                break;
        }

        return ingredient;
    }
}

export default BurgerIngredient;
