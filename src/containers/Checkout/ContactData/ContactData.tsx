import React, { Component } from "react";
import "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-order";
import Loader from "../../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { RootState, stateToProps } from "../../../model/ingredient";
import { RouteComponentProps } from "react-router-dom";

type Props = stateToProps & RouteComponentProps;

export class ContactData extends Component<Props> {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalcode: "",
        },
        loading: null,
    };

    orderHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        this.setState({ loading: true });
        const ordereDetail = {
            ingredients: this.props.ings,
            totalPrice: this.props.totalPrice,
            customer: {
                address: {
                    name: "Assit test",
                    street: "Test street",
                    pin: "123456",
                },
                mailId: "asit@test.com",
            },
            deliveryMethod: "fastest",
        };
        axiosInstance
            .post("/orders.json", ordereDetail)
            .then((response) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };

    nameValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("");
    };

    render() {
        let form = (
            <form>
                {/* <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street Name" />
                <input type="text" name="postal" placeholder="Postal Code" /> */}
                <TextField
                    id="email"
                    placeholder="Enter your Name"
                    label="Name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error
                    helperText=""
                    onChange={this.nameValidate}
                />
                <TextField
                    id="email"
                    placeholder="Enter your Email"
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    id="email"
                    placeholder="Enter your Street"
                    label="Street"
                    variant="filled"
                />
                <TextField
                    id="email"
                    placeholder="Enter your PIN"
                    label="Postal Code"
                    variant="outlined"
                />
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
