import {
    ALBUM_FETCH_SUCCESS,
    CHANGE_SEARCH_FIELD
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    albums: null,
    searchField: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALBUM_FETCH_SUCCESS:
            return { ...state,
                loading: false,
                albums: action.payload };
        case CHANGE_SEARCH_FIELD:
            return Object.assign({},
                state, { searchField: action.payload });
        default:
            return state;
    }
};
