import {
    ALBUM_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    albums: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALBUM_FETCH_SUCCESS:
            return { ...state, loading: false, albums: action.payload };
        default:
            return state;
    }
};
