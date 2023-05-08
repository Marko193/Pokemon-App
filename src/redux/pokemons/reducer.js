export const initialState = {
    pokemons: [],
    isLoading: true,
    notFound: false,
};

export const pokemons = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case 'GET_POKEMONS_LIST_REQUEST':
            return {
                ...state,
                isLoading: true,
            };

        case 'GET_POKEMONS_LIST_SUCCESS':
            return {
                ...state,
                pokemons: action.payload.pokemons,
                isLoading: false,
                notFound: false,
            };

        case 'GET_POKEMONS_LIST_BY_SEARCH_REQUEST':
            return {
                ...state,
                isLoading: true,
            };

        case 'GET_POKEMONS_LIST_BY_SEARCH_SUCCESS':
            return {
                ...state,
                pokemons: action.payload.pokemons,
                isLoading: false,
                notFound: action.payload.notFound,
            };
        default:
            return state;
    }
};
