import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";


let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})
type ReducersType = typeof rootReducers; // (global: AppStateType) => AppStateType

export type AppStateType = ReturnType<ReducersType>;

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;