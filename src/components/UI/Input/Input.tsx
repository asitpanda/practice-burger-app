import React, { MouseEvent } from "react";
import { INPUTTYPE } from "../../../model/forms";
import TextField from "@material-ui/core/TextField";
// import classes from './Input.css';
import AUX from "../../../hoc/Aux/Aux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

interface DropddownOption {
    value: string;
    displayValue: string;
}

interface OwnProp {
    key: string;
    elementType: INPUTTYPE;
    elementConfig: {
        label: string;
        placeholder: string;
        options?: Array<DropddownOption>;
    };
    value: string;
    inValid: boolean;
    validation: {
        required: boolean;
        rules?: any;
    };
    changed: (
        event:
            | React.FocusEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLInputElement | { value: unknown }>
    ) => void;
    validationTypes?: Array<any>;
    id: string;
    errorMsg: string;
}

const input = (props: OwnProp) => {
    let inputElement = null;

    switch (props.elementType) {
        case INPUTTYPE.TEXTFIELD:
            inputElement = (
                <TextField
                    id={props.id}
                    {...props.elementConfig}
                    required={props.validation.required}
                    error={props.errorMsg.length > 0 && props.inValid}
                    helperText={props.inValid && props.errorMsg}
                    onBlur={props.changed}
                    onChange={props.changed}
                />
            );
            break;
        case INPUTTYPE.DROPDOWN:
            inputElement = (
                <FormControl>
                    <InputLabel id="demo-simple-select-label">
                        {props.elementConfig.label}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder={props.elementConfig.placeholder}
                        value={props.value}
                        onChange={props.changed}
                        onBlur={props.changed}
                        required={props.validation.required}
                        error={props.errorMsg.length > 0 && props.inValid}
                    >
                        {props.elementConfig.options &&
                            props.elementConfig.options.map(
                                (option: DropddownOption) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.displayValue}
                                    </MenuItem>
                                )
                            )}
                    </Select>
                    <FormHelperText
                        error={props.errorMsg.length > 0 && props.inValid}
                    >
                        {props.inValid && props.errorMsg}
                    </FormHelperText>
                </FormControl>
            );
            break;
        default:
            inputElement = (
                <input
                    // className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }

    return <AUX>{inputElement}</AUX>;
};

export default input;
