import {getUserLogin} from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

//state
let initialState = {
    initialized: false
}

// Reducer
const appReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZE_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

//ActionCreators
export const actions = {
    initializeSuccess: () =>({ type: 'SN/APP/INITIALIZE_SUCCESS' }) as const
}

//Thunks
export const initializeApp = (): BaseThunkType<ActionsType> => async (dispatch) => {
        let promise = await dispatch(getUserLogin());

        Promise.all([promise]).then(() => {
        dispatch(actions.initializeSuccess());
        });
}

export default appReducer;

//Types
type ActionsType = InferActionsTypes<typeof actions>
export type initialStateType = typeof initialState