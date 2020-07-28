export enum INPUTTYPE {
    TEXTFIELD,
    DROPDOWN
}

export interface Validator { isValid: boolean; errorMsg: string }