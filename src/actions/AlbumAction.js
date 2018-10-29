import {
    ALBUM_ADD
} from './types';

export const albumAdd = ({ prop, value }) => {
    return {
        type: ALBUM_ADD,
        payload: { prop, value }
    };
};
