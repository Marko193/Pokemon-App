import { all } from 'redux-saga/effects';
import pokemons from './pokemons/sagas';

export default function* rootSaga() {
    yield all([pokemons()]);
}
