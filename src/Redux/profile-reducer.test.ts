import profileReducer, {actions} from "./profile-reducer";
import {PostDataType, ProfileType} from "../Types/types";

let state = {
    postData: [
        {id: 1, message: "WTF?", likes: 12},
        {id: 2, message: "Я молодой тупак", likes: 14},
    ] as Array<PostDataType>,
    newPostText: "",
    profile: null as null | ProfileType ,
    status: ""
}

it('new post should be added', () => {
    let action = actions.addPostActionCreator("hi");
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(3);
});

test('message of new post should be correct', () => {
    let action = actions.addPostActionCreator("hi");
    let newState = profileReducer(state, action);
    expect(newState.postData[2].message).toBe("hi");
});

test('after deleting length of messages should be decrement', () => {
    let action = actions.deletePostActionCreator(1);
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(1);
});

