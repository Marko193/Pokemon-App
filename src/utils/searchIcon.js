import { icons } from '../constants/icons';
export const searchIcon = (search) => {
    if (search) {
        search = Object.entries(icons).filter((icon) => icon[0] === search);
        return search[0][1];
    }
};
