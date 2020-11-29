const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
    dialogsData: [
        {id: 1, name: 'Pavel'},
        {id: 2, name: 'Kasha'},
        {id: 3, name: 'Andrey'},
        {id: 4, name: 'Masha'},
        {id: 5, name: 'Viktor'},
    ],

    messageData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "What's up"},
        {id: 3, message: "Yo"},
    ],
    newMessageText: "",
}
const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT: {
            let stateCopy = {...state};
            stateCopy.newMessageText = action.newMessage;
            return stateCopy;
        }
        case ADD_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.messageData = [...state.messageData];
            let body = state.newMessageText;
            stateCopy.newMessageText = ' ';
            stateCopy.messageData.push({
                id: 4,
                message: body
            });
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({
    type: ADD_MESSAGE
})

export const updateNewMessageTextActionCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_TEXT, newMessage: body
})
export default dialogReducer;