import React, { Component } from "react";
import BackDrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import "./Modal.css";

interface OwnProp {
    show: boolean;
    children: React.ReactNode;
    modalClosed: () => void;
}

class Modal extends Component<OwnProp> {
    shouldComponentUpdate(nextProps: OwnProp, nextState: OwnProp) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    componentWillUpdate() {
        console.log("inside modal");
    }

    render() {
        return (
            <Aux>
                <BackDrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className="Modal"
                    style={{
                        transform: this.props.show
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0",
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
