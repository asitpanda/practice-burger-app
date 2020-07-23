import React from "react";
import Logo from "../../Logo/Logo";
import "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
interface OwnProps {
    drawerToggleClicked: () => void;
}
const toolbar = (props: OwnProps) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo />
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);
export default toolbar;
