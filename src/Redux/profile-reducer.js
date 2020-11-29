const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    postData: [
        {id: 1, message: "WTF?", likes: "12"},
        {id: 2, message: "Я молодой тупак", likes: "14"},
    ],
    newPostText: "",
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let postNew = {
                id: 3,
                message: state.newPostText,
                likes: 0,
            }
            let stateCopy = {...state};
            stateCopy.postData = [...state.postData];
            stateCopy.postData.push(postNew);
            stateCopy.newPostText = ' ';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({
    type: ADD_POST
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
})

export default profileReducer;