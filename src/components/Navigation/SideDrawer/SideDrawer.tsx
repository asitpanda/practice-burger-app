import React from "react";
import "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
interface OwnProps {
    open: boolean;
    closed: () => void;
    isAuth: boolean;
}
const sideDrawer = (props: OwnProps) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
