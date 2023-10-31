import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { INPUTTYPE, Validator } from "../../model/forms";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Loader/Loader";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { stateToProps, RootState } from "../../model/store";
import { checkValidity } from "../../hoc/validator";
import AUX from "../../hoc/Aux/Aux";
import Grid from "@material-ui/core/Grid";

interface OwnProps {
    buildingBurger: any;
    authRedirectPath: string;
    error: any;
    isAuthenticated: boolean;
}

interface DispatchProps {
    onSetAuthRedirectPath: () => void;
    onAuth: (email: string, password: string, isAuth: boolean) => void;
}

type Props = OwnProps & stateToProps & RouteComponentProps & DispatchProps;

class Auth extends Component<Props> {
    state: any = {
        controls: {
            email: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "Email",
                    placeholder: "Enter your Email 1",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                        isEmail: true,
                    },
                },
                valid: false,
                errorMsg: "",
            },
            password: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "Password 31",
                    type: "password",
                    placeholder: "Enter your Password 1",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                        minLength: 6,
                    },
                },
                valid: false,
                errorMsg: "",
            },
        },
        isSignup: true,
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (
        event:
            | React.FocusEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLInputElement | { value: unknown }>,
        controlName: string
    ) => {
        const targetValue: any = event.target.value;
        const eleData: Validator = checkValidity(
            targetValue,
            this.state.controls[controlName].validation.rule
        );

        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: eleData.isValid,
                errorMsg: !eleData.isValid ? eleData.errorMsg : "",
            },
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState: any) => {
            return { isSignup: !prevState.isSignup };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form: any = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                validation={formElement.config.validation}
                changed={(
                    event:
                        | React.FocusEvent<HTMLInputElement>
                        | React.ChangeEvent<
                              HTMLInputElement | { value: unknown }
                          >
                ) => this.inputChangedHandler(event, formElement.id)}
                errorMsg={formElement.config.errorMsg}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        {form}
                    </Grid>
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">
                    <AUX>
                        {" "}
                        SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
                    </AUX>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string, isSignup: boolean) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
