import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_FAIL,
    SIGNUP_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
}; 

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) { 
        case EMAIL_CHANGED: 
            return { ...state, email: action.payload }; 
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case SIGNUP_USER:
            return { ...state, loading: true, error: '' };
        case SIGNUP_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case SIGNUP_USER_FAIL:
            return { ...state, error: 'No se pudo registrar.', password: '', loading: false };
        default:                                        
            return state;
    }
};