import React, { Component } from "react";
import "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axiosInstance from "../../../axios-order";
import Loader from "../../../components/UI/Loader/Loader";
import { connect } from "react-redux";

export class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalcode: "",
        },
    };

    orderHandler = (event) => {
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

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street Name" />
                <input type="text" name="postal" placeholder="Postal Code" />
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

export default connect(mapStateToProps)(ContactData);
