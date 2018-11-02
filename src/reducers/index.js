import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignupReducer from './SignupReducer';
import UserReducer from './UserReducer';
import AlbumReducer from './AlbumReducer';

export default combineReducers({
    auth: AuthReducer, // property of state that we produce
    sinup: SignupReducer,
    userForm: UserReducer,
    albums: AlbumReducer
});
