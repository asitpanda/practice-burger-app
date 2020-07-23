import React from "react";

import "./DrawerToggle.css";
interface OwnProps {
    clicked: () => void;
}
const drawerToggle = (props: OwnProps) => (
    <div className="DrawerToggle" onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
