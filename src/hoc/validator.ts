import { Validator } from '../model/forms';

export function checkValidity(value: string, rules: any): Validator {
    let output = {
        isValid: true,
        errorMsg: ''
    };

    if (!rules)
    {
        return output;
    }


    if (rules.isMandatory && output.isValid)
    {
        output.isValid = value.trim() !== '';
        output.errorMsg = !output.isValid ? 'This is a required field' : '';
    }

    if (rules.minLength && output.isValid)
    {
        output.isValid = value.length >= rules.minLength;
        output.errorMsg = !output.isValid ? 'Minimum ' + rules.minLength + ' required field' : '';

    }

    if (rules.maxLength && output.isValid)
    {
        output.isValid = value.length <= rules.maxLength;
        output.errorMsg = !output.isValid ? 'Maximum ' + rules.maxLength + ' required field' : '';

    }

    if (rules.isEmail && output.isValid)
    {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        output.isValid = pattern.test(value);
        output.errorMsg = !output.isValid ? 'Email is invalid' : '';
    }

    if (rules.isNumeric && output.isValid)
    {
        const pattern = /^\d+$/;
        output.isValid = pattern.test(value);
        output.errorMsg = !output.isValid ? 'Only numbers are allowed' : '';
    }

    return output;
}