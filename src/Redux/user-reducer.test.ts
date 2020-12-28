import usersReducer, {actions, getFollow, getUnfollow, InitialStateActionType} from "./users-reducer";
import {usersApi} from "../API/users-api";
import {APIResponseType, ResultCodesEnum} from "../API/api";

jest.mock("../API/users-api")
const userApiMock = usersApi as jest.Mocked<typeof usersApi>;

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
let state: InitialStateActionType;


beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Pasha", followed: false, photos: {small: null, large: null}, status: "0"},
            {id: 1, name: "Masha", followed: false, photos: {small: null, large: null}, status: "1"},
            {id: 2, name: "Sasha", followed: true, photos: {small: null, large: null}, status: "2"},
            {id: 3, name: "Dasha", followed: true, photos: {small: null, large: null}, status: "3"},
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [],
        filter: {
            term: ''
        }
    }
})

test("follow success", () => {
    const newState = usersReducer(state, actions.follow(0))
    expect (newState.users[1].followed).toBeFalsy();
    expect (newState.users[0].followed).toBeTruthy();
})

test("unfollow success", () => {
    const newState = usersReducer(state, actions.unfollow(2))
    expect (newState.users[2].followed).toBeFalsy();
    expect (newState.users[3].followed).toBeTruthy();
})


userApiMock.getFollow.mockReturnValue(Promise.resolve(result));
userApiMock.getUnfollow.mockReturnValue(Promise.resolve(result));
test('success getFollow thunk', async () => {
    const thunk = getFollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
})

test('success getUnfollow thunk', async () => {
    const thunk = getUnfollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
})