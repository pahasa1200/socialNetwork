import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, message: "WTF?", likes: "12"},
                {id: 2, message: "Я молодой тупак", likes: "14"},
            ],
            newPostText: "",
        },

        dialogsPage: {
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
        },

        sidebar: {
            friends: [
                {id: 1, friend: "Pasha"},
                {id: 2, friend: "Sasha"},
                {id: 3, friend: "Masha"},
            ]
        }
    },
    _callSubscriber() {
        console.log("");
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
}


export default store;
