import { put, call, takeEvery, all, fork } from 'redux-saga/effects';

import { getPokemonsListRequest, getPokemonsListSuccess } from './actions';
import axios from 'axios';

const getPokemons = async () => {
    const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`
    );

    const promises = data.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
    });

    return await Promise.all(promises);
};

export function* sagaPokemonsListWatcher() {
    yield takeEvery('GET_POKEMONS_LIST', sagaPokemonsListWorker);
}

export function* sagaPokemonsListWorker() {
    try {
        yield put(getPokemonsListRequest(true));
        const pokemons = yield call(getPokemons);
        // console.log('pokemons sagas results', pokemons);
        yield put(getPokemonsListSuccess(pokemons, false));
    } catch (e) {
        yield put(getPokemonsListSuccess([], false));
    }
}

export default function* rootSaga() {
    yield all([fork(sagaPokemonsListWatcher)]);
}
