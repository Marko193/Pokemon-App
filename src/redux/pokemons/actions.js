export const getPokemonsListRequest = (isLoading) => ({
    type: 'GET_POKEMONS_LIST_REQUEST',
    payload: { isLoading },
});

export const getPokemonsListSuccess = (pokemons, isLoading) => ({
    type: 'GET_POKEMONS_LIST_SUCCESS',
    payload: {
        pokemons,
        isLoading,
    },
});

export const getPokemonsListBySearchRequest = (isLoading) => ({
    type: 'GET_POKEMONS_LIST_BY_SEARCH_REQUEST',
    payload: { isLoading },
});

export const getPokemonsListBySearchSuccess = (
    pokemons,
    isLoading,
    notFound
) => ({
    type: 'GET_POKEMONS_LIST_BY_SEARCH_SUCCESS',
    payload: {
        pokemons,
        isLoading,
        notFound,
    },
});

export const getEmptyListBySearch = (isLoading) => ({
    type: 'GET_EMPTY_LIST_BY_SEARCH',
    payload: {
        isLoading,
    },
});
