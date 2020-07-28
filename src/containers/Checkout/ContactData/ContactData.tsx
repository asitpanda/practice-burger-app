import React, { Component } from "react";
import "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-order";
import Loader from "../../../components/UI/Loader/Loader";
import { connect } from "react-redux";
// import TextField from "@material-ui/core/TextField";
import { RootState, stateToProps } from "../../../model/ingredient";
import { INPUTTYPE, Validator } from "../../../model/forms";
import { RouteComponentProps } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import { Grid } from "@material-ui/core";
import { checkValidity } from "../../../hoc/validator";

type Props = stateToProps & RouteComponentProps;

export class ContactData extends Component<Props> {
    state: any = {
        orderForm: {
            name: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "Name",
                    placeholder: "Enter your Name",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                    },
                },
                valid: false,
                errorMsg: "",
            },
            street: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "Street",
                    placeholder: "Enter your Street",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                    },
                },
                valid: false,
                errorMsg: "",
            },
            zipCode: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "ZIP",
                    placeholder: "Enter your ZIP Code",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                        isNumeric: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                },
                valid: false,
                errorMsg: "",
            },
            country: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "Country",
                    placeholder: "Enter your country",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                    },
                },
                valid: false,
                errorMsg: "",
            },
            email: {
                elementType: INPUTTYPE.TEXTFIELD,
                elementConfig: {
                    label: "Email",
                    placeholder: "Enter your E-Mail",
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isEmail: true,
                        isMandatory: true,
                    },
                },
                valid: false,
                errorMsg: "",
            },
            deliveryMethod: {
                elementType: INPUTTYPE.DROPDOWN,
                elementConfig: {
                    label: "Delivery",
                    placeholder: "Select delivery type",
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "",
                validation: {
                    required: true,
                    rule: {
                        isMandatory: true,
                    },
                },
                valid: false,
                errorMsg: "",
            },
        },
        formIsValid: false,
        loading: false,
    };

    orderHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let formIsValid = true;
        const formData: any = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formIsValid =
                this.state.orderForm[formElementIdentifier].valid &&
                formIsValid;
            if (!formIsValid) {
                break;
            }
            formData[formElementIdentifier] = this.state.orderForm[
                formElementIdentifier
            ].value;
        }
        if (!formIsValid) {
            alert("Please fill all fields");
            return;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
        };
        axiosInstance
            .post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };

    changeHandler = (
        event:
            | React.FocusEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLInputElement | { value: unknown }>,
        eleId: string
    ) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[eleId],
        };
        updatedFormElement.value = event.target.value;

        const eleData: Validator = checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation.rule
        );

        updatedFormElement.valid = eleData.isValid;
        if (!updatedFormElement.valid) {
            updatedFormElement.errorMsg = eleData.errorMsg;
        }

        updatedOrderForm[eleId] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm,
        });
    };

    render() {
        const formElementsArray: any = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = (
            <form>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                >
                    {formElementsArray.map((formElement: any) => (
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
                            ) => this.changeHandler(event, formElement.id)}
                            errorMsg={formElement.config.errorMsg}
                        />
                    ))}
                </Grid>
                <Button btnType="Success" clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Loader />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

export default connect(mapStateToProps)(ContactData);
