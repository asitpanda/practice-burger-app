import React from "react";
import "./NavigationItem.css";
import { NavLink } from "react-router-dom";
interface OwnProps {
    exact?: boolean;
    link: string;
    children: string;
}
const navigationItem = (props: OwnProps) => (
    <li className="NavigationItem">
        <NavLink exact={props.exact} activeClassName="active" to={props.link}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
