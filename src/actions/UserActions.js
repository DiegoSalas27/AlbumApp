import {
    USER_UPDATE
} from './types';

export const userUpdate = ({ prop, value }) => {
    return {
        type: USER_UPDATE,
        payload: { prop, value }
    };
};
