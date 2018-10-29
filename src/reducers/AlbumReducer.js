import {
    USER_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    title: '',
    artist: '',
    thumbnail_image: '',
    image: '',
    url: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_UPDATE:
            // key interpolation, the key will be determine at runtime
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};
