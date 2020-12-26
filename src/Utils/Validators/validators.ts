export type FieldValidatorType = (value: string) =>  string | undefined

export const requieredField: FieldValidatorType = (value)=> {
    if (value){
        return undefined;
    }
    return "Field is requiered";
}

export const maxLengthCreator = (maxlength: number): FieldValidatorType => value => {
    if (value.length > maxlength ) return `Max length is ${maxlength} symbols`;
    return undefined;
}