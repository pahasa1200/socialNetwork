import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";

let state = {
    postData: [
        {id: 1, message: "WTF?", likes: "12"},
        {id: 2, message: "Я молодой тупак", likes: "14"},
    ]
};

test('new post should be added', () => {
    let action = addPostActionCreator("hi");
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(3);
});

test('message of new post should be correct', () => {
    let action = addPostActionCreator("hi");
    let newState = profileReducer(state, action);
    expect(newState.postData[2].message).toBe("hi");
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePostActionCreator(1);
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(1);
});

