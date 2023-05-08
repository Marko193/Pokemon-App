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
