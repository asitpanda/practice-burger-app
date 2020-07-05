import React, { Component } from "react";
import "./Orders.css";
import axiosInstance from "../../axios-order";

import Order from "../../components/Order/Order";

export class Orders extends Component {
    state = {
        order: [],
    };
    componentDidMount() {
        axiosInstance
            .get("/orders.json")
            .then((response) => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                this.setState({ order: orders });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                {this.state.order.map((order) => (
                    <Order data={order} key={order.id} />
                ))}
            </div>
        );
    }
}

export default Orders;
