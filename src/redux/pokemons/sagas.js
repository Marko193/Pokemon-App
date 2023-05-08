import { put, call, takeEvery, all, fork } from 'redux-saga/effects';

import { getPokemonsListRequest, getPokemonsListSuccess } from './actions';
import axios from 'axios';

const getPokemons = () => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`);
};

export function* sagaPokemonsListWatcher() {
    yield takeEvery('GET_POKEMONS_LIST', sagaPokemonsListWorker);
}

export function* sagaPokemonsListWorker() {
    try {
        yield put(getPokemonsListRequest(true));
        const responsePokemonsList = yield call(getPokemons);
        console.log('responsePokemonsList sagas', responsePokemonsList);
        // yield put(getEmployeeListSuccess(responsePokemonsList.data, false));
    } catch (e) {
        // yield put(getEmployeeListSuccess([], false));
    }
}

export default function* rootSaga() {
    yield all([fork(sagaPokemonsListWatcher)]);
}
