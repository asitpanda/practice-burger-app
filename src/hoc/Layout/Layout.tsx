import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Aux from "../Aux/Aux";
import "./Layout.css";
class Layout extends Component {
    state = {
        showSideDrawer: false,
    };
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState: any) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <main className="Content">{this.props.children}</main>
            </Aux>
        );
    }
}

export default Layout;
