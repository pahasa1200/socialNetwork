export const requieredField = value => {
    if (value){
        return undefined;
    }
    return "Field is requiered";
}

export const maxLengthCreator = (maxlength) => value => {
    if (value.length > maxlength ) return `Max length is ${maxlength} symbols`;
    return undefined;
}