import React from "react";
import "./Logo.css";
import burgerLogo from "../../assets/images/logo.png";

interface OwnProps {
    height?: string;
}

const logo = (props: OwnProps) => (
    <div className="Logo" style={{ height: props.height }}>
        <img src={burgerLogo} alt="Burger Logo" />
    </div>
);
export default logo;
