import React from "react";

import "./Button.css";
interface OwnProps {
    children: React.ReactChild;
    clicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    btnType: string;
}
const button = (props: OwnProps) => (
    <button onClick={props.clicked} className={`Button  ${props.btnType}`}>
        {props.children}
    </button>
);

export default button;
