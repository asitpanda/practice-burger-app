import React from "react";
import "./Backdrop.css";
interface OwnProps {
    show?: boolean;
    clicked: () => void;
}
const backDrop = (props: OwnProps) =>
    props.show ? (
        <div className="Backdrop" onClick={props.clicked}></div>
    ) : null;

export default backDrop;
