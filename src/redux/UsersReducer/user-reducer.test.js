import usersReducer, { setUserCearch } from './user-reducer';



it('Setting the search member', () => {
    let action = setUserCearch('a')
    let state = {
        users: []
    }

    let newState = usersReducer(state, action)


    expect(newState.usersSearch.length).toBe(10)
})