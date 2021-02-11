import {ResultCodeForCaptcha, ResultCodesEnum} from "../API/api";
import {stopSubmit} from "redux-form";
import {log} from "util";
import {authApi} from "../API/auth-api";
import {securityApi} from "../API/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../API/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid'



//state
let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

//Reducer
const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED':
            return {
                ...state,
                messages:
                    [...state.messages,
                    ...action.payload.messages.map(m => ({...m, id: v1()}))]
                        .filter((m, index, array) =>
                    index >= array.length - 100)
            }
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

//ActionCreators
export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type:
        'SN/chat/MESSAGES_RECEIVED', payload: {messages}
    }) as const,
    statusChanged: (status: StatusType) => ({
        type:
            'SN/chat/STATUS_CHANGED', payload: {status}
    }) as const
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null){
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) =>{
    if (_statusChangedHandler === null){
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessageListening = (): BaseThunkType<ActionsType> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
};

export const stopMessageListening = (): BaseThunkType<ActionsType> => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received' ,newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed' ,statusChangedHandlerCreator(dispatch))
};

export const sendMessage = (message: string): BaseThunkType<ActionsType> => async (dispatch) => {
    chatAPI.sendMessage(message)
};

export default chatReducer;

//Types
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ChatMessageType = ChatMessageAPIType & {id: string}
