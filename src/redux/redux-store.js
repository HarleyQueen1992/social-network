import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import friendsReducer from "./FriendsReducer/friends-reducer"
import navbarReducer from "./NavbarReducer/navbar-reducer"
import profileReducer from "./ProfileReducer/profile-reducer"
import userReducer from "./UsersReducer/user-reducer"
import authReducer from "./AuthReducer/auth-reducer"
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./AppReducer/app-reducer"
import postsReducer from "./PostsReducer/posts-reducer"
import searchReducer from "./SearchReducer/search-reducer"
import settingsReducer from "./SettingsReducer/settings-reducer"
import followersReducer from './FollowersReducer/followers-reducer'
import newsReducer from "./NewsPeducer/news-reducer"

let reducers = combineReducers({
  profilePage: profileReducer,
  friendsPage: friendsReducer,
  navbarPage: navbarReducer,
  usersPage: userReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  posts: postsReducer,
  search: searchReducer,
  settings: settingsReducer,
  followers: followersReducer,
  news: newsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)


window.store = store

export default store
