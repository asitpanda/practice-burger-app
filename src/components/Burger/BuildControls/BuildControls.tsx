import React from "react";
import { Ingridient_control } from "../../../model/ingredient";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

interface OwnProps {
    price?: any;
    ingredientAdded: (type: string) => void;
    ingredientRemoved: (type: string) => void;
    disabledData: { [key: string]: boolean };
    purchasable?: boolean;
    ordered: () => void;
    isAuth?: boolean;
}

interface uiCtrl {
    label: string;
    type: string;
}

const buildControls = (props: OwnProps) => (
    <div className="BuildControls">
        <p>
            Current Price-master-branch: <strong>{props.price.toFixed(2)}</strong>
        </p>
        {Ingridient_control.map((ctrl: uiCtrl) => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabledData[ctrl.type]}
            />
        ))}
        <button
            className="OrderButton"
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
            {props.isAuth ? "ORDER NOW Client" : "SIGN UP TO ORDER"}
        </button>
    </div>
);

export default buildControls;
