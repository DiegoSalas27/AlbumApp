import {
    ACCOUNT_SELECTED,
    GENRE_ALL,
    GENRE_CHANGED,
    ALBUM_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    albums: null,
    account: '',
    genre: '',
    loadBtn: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALBUM_FETCH_SUCCESS:
            return { ...state,
                loading: false,
                albums: action.payload };
        case GENRE_CHANGED:
            return { ...state, genre: action.payload };
        case GENRE_ALL:
            return { ...state, genre: '' };
        case ACCOUNT_SELECTED:
            return { ...state, account: action.payload };
        default:
            return state;
    }
};
