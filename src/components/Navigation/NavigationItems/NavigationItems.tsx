import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
interface OwnProps {
    isAuthenticated?: boolean;
}
const navigationItems = (props: OwnProps) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>
            Burger Builder
        </NavigationItem>
        {props.isAuthenticated ? (
            <NavigationItem link="/orders">Orders</NavigationItem>
        ) : null}
        {!props.isAuthenticated ? (
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        ) : (
            <NavigationItem link="/logout">Logout</NavigationItem>
        )}
    </ul>
);

export default navigationItems;
