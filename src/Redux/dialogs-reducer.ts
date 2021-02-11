import {InferActionsTypes} from "./redux-store";

//state
let initialState = {
    dialogsData: [
        {id: 1, name: 'Pavel'},
        {id: 2, name: 'Kasha'},
        {id: 3, name: 'Andrey'},
        {id: 4, name: 'Masha'},
        {id: 5, name: 'Viktor'},
    ] as Array<DialogType>,

    messageData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "What's up"},
        {id: 3, message: "Yo"},
    ] as Array<MessageType>,
    newMessageText: "" as string,
}

//Reducer
const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType  => {
    switch (action.type) {
        case "SN/DIALOGS/ADD_MESSAGE": {
            let body = action.newMessageBody;
            return {
                ...state,
                messageData: [...state.messageData, {id: 6, message: body}]
            };
        }
        default:
            return state;
    }
}
//ActionCreators
export const actions = {
    addMessage: (newMessageBody: string) => ({
        type: 'SN/DIALOGS/ADD_MESSAGE', newMessageBody
    }) as const,
}

export default dialogReducer;

//Types
type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}
export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>
