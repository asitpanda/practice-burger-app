import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

interface DispatchProps {
    onLogout: () => void;
}

export class Logout extends Component<DispatchProps> {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
