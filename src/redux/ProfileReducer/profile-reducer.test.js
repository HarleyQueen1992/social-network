import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';



it('Will the post be deleted', () => {
    let action = deletePost(1)
    let state = {
        posts: [
            { id: 0, message: 'Hi, my name is Artem', like: 50, dislike: 100, isDisable: false },
            { id: 1, message: 'Hi, my name is Artem', like: 52, dislike: 99, isDisable: false }
        ]
    }

    let newState = profileReducer(state, action)


    expect(newState.posts.length).toBe(1)
})