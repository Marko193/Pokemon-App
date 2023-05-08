import * as React from 'react';
import { useEffect, useState } from 'react';
import Title from './components/title';
import './App.css';
import Search from './components/search';
import Grid from './layout/grid';
import { CircularProgress, Container, TablePagination } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
    const dispatch = useDispatch();

    const pokemonsData = useSelector(
        ({ pokemons: { pokemons, isLoading, notFound } }) => ({
            pokemons,
            isLoading,
            notFound,
        })
    );

    // console.log('pokemonsData', pokemonsData);

    const pokemonState = useSelector((state) => state);
    console.log('pokemonState', pokemonState);

    const [notFound, setNotFound] = useState(false);
    const [search, setSearch] = useState([]);
    const [searching, setSearching] = useState(false);
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);

    const handleChangePage = (event, newpage) => {
        setpg(newpage);
    };

    const handleChangeRowsPerPage = (event) => {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    };

    useEffect(() => {
        if (!searching) {
            dispatch({ type: 'GET_POKEMONS_LIST' });
        }
    }, []);

    const handleSearch = async (textSearch) => {
        console.log('textSearch', textSearch);
        dispatch({ type: 'GET_POKEMONS_LIST_BY_SEARCH', payload: textSearch });
        // if (!textSearch) {
        //     setSearch([]);
        //     setNotFound(false);
        //     return;
        // }
        //
        // setNotFound(false);
        // setSearching(true);
        //
        // const { data } = await axios.get(
        //     `https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`
        // );
        //
        // if (!data) {
        //     setNotFound(true);
        //     return;
        // } else {
        //     setSearch([data]);
        // }
        // setSearching(false);
    };

    const data = (state) => state.pokemons;

    // const showPokemons = async (limit, offset) => {
    //     const { data } = await axios.get(
    //         `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    //     );
    //
    //     const promises = data.results.map(async (pokemon) => {
    //         const response = await axios.get(pokemon.url);
    //         return response.data;
    //     });
    //
    //     const results = await Promise.all(promises);
    //
    //     setSearch([]);
    //     setPokemons(results);
    //     setNotFound(false);
    //     setTotal(total + results.length);
    // };

    const pokemonsList = search.length > 0 ? search : pokemonsData.pokemons;
    // console.log('pokemonsList', pokemonsList);
    return (
        <>
            <Container>
                <Title title="PokeApi React App" />
                <Search onHandleSearch={handleSearch} />
                <div style={{ textAlign: 'center' }}>
                    {pokemonsData.notFound ? (
                        <div>No data were found.</div>
                    ) : (
                        <>
                            {pokemonsList.length !== 0 &&
                            pokemonsData.isLoading === false ? (
                                <>
                                    <Grid
                                        pokemons={pokemonsList.slice(
                                            pg * rpg,
                                            pg * rpg + rpg
                                        )}
                                    />
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 50]}
                                        component="div"
                                        count={pokemonsList.length}
                                        rowsPerPage={rpg}
                                        page={pg}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                    />
                                </>
                            ) : (
                                <CircularProgress />
                            )}
                        </>
                    )}
                </div>
            </Container>
        </>
    );
}
