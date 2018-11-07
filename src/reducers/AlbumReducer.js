import {
    GENRE_ALL,
    SHOW_BUTTON,
    GENRE_CHANGED,
    ALBUM_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    albums: null,
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
        case SHOW_BUTTON:
            return { ...state, loadBtn: true };
        default:
            return state;
    }
};
