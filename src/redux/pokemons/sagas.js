import { put, call, takeEvery, all, fork } from 'redux-saga/effects';

import {
    getPokemonsListBySearchRequest,
    getPokemonsListBySearchSuccess,
    getPokemonsListRequest,
    getPokemonsListSuccess,
} from './actions';
import axios from 'axios';

const getPokemonsHelper = async () => {
    const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`
    );

    const promises = data.results.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
    });

    return await Promise.all(promises);
};

const searchPokemonsHelper = async (textSearch) => {
    const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`
    );

    if (response.status === 404) {
        return [];
    } else {
        return response.data;
    }
};

export function* sagaPokemonsListWatcher() {
    yield takeEvery('GET_POKEMONS_LIST', sagaPokemonsListWorker);
}

export function* sagaPokemonsListBySearchWatcher() {
    yield takeEvery(
        'GET_POKEMONS_LIST_BY_SEARCH',
        sagaPokemonsListBySearchWorker
    );
}

export function* sagaPokemonsListWorker() {
    try {
        yield put(getPokemonsListRequest(true));
        const pokemons = yield call(getPokemonsHelper);
        yield put(getPokemonsListSuccess(pokemons, false));
    } catch (e) {
        yield put(getPokemonsListSuccess([], false));
    }
}

export function* sagaPokemonsListBySearchWorker(data) {
    try {
        if (!data.payload) {
            yield call(sagaPokemonsListWorker);
        } else {
            yield put(getPokemonsListBySearchRequest(true));
            const searchedPokemons = yield call(
                searchPokemonsHelper,
                data.payload
            );
            yield put(
                getPokemonsListBySearchSuccess([searchedPokemons], false, false)
            );
        }
    } catch (err) {
        if (err.response.status === 404) {
            yield put(getPokemonsListBySearchSuccess([], false, true));
        }
    }
}

export default function* rootSaga() {
    yield all([
        fork(sagaPokemonsListWatcher),
        fork(sagaPokemonsListBySearchWatcher),
    ]);
}
