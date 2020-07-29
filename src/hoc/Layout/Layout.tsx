import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Aux from "../Aux/Aux";
import "./Layout.css";
import { RootState } from "../../model/store";
import { connect } from "react-redux";
interface OwnProps {
    isAuthenticated: boolean;
}
class Layout extends Component<OwnProps> {
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
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className="Content">{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
