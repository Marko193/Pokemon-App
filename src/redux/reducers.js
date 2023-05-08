import { combineReducers } from 'redux';
import { pokemons } from './pokemons/reducer';

const appReducer = combineReducers({ pokemons });

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
