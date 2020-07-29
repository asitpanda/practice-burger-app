import React, { Component } from "react";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";
import { RootState, stateToProps } from "../../model/store";

type Props = stateToProps & RouteComponentProps;

export class Checkout extends Component<Props> {
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        let summary = <Redirect to="/" />;

        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancelHandler={this.checkoutCancelHandler}
                        continueHandler={this.checkoutContinueHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        ings: state.burger.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);
