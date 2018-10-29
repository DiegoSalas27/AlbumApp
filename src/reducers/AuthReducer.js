import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
}; //piece of state which is default

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) { //whatever value we return from this reducer will be our aplication state
        case EMAIL_CHANGED: //make a new object, take all of the properties of my existing state object and throw them into that object,
            return { ...state, email: action.payload }; //define property email, give it a value of the reducer and toss it on top of the new state
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload }; //we reset all the state in the reducer
        case LOGIN_USER_FAIL:
            return { ...state, error: 'No se pudo autenticar.', password: '', loading: false };
        default:                                        
            return state;
    }
};
