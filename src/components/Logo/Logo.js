import React from "react";
import "./Logo.css";
import burgerLogo from "../../assets/images/logo.png";

const logo = (props) => (
    <div className="Logo" style={{ height: props.height }}>
        <img src={burgerLogo} alt="Burger Logo" />
    </div>
);
export default logo;
