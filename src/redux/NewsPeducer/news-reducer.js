const SET_PAGE_SELECTION = 'app/news-reducer/SET_PAGE_SELECTION';


let initialState = {
    // pageSelection: 'news'
}

// ! Reducer

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_SELECTION:
      return {
        ...state,
        pageSelection: action.pageSelection,
      }
    default:
      return state
  }
}

// Action Creator

// export const setPageSelection = (pageSelection) => {
//   return { type: SET_PAGE_SELECTION, pageSelection }
// }
// Thunk Creator



export default newsReducer
