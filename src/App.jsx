import * as React from 'react';
import { useEffect, useState } from 'react';
import Title from './components/title';
import './App.css';
import Search from './components/search';
import Grid from './layout/grid';
import { CircularProgress, Container, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
    const dispatch = useDispatch();

    const pokemonState = useSelector(
        ({ pokemons: { pokemons, isLoading, notFound } }) => ({
            pokemons,
            isLoading,
            notFound,
        })
    );

    // console.log('pokemonState', pokemonState);
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
        dispatch({ type: 'GET_POKEMONS_LIST' });
    }, []);

    const handleSearch = async (textSearch) => {
        dispatch({ type: 'GET_POKEMONS_LIST_BY_SEARCH', payload: textSearch });
    };

    return (
        <>
            <Container>
                <Title title="PokeApi React App" />
                <Search
                    onHandleSearch={handleSearch}
                    isLoading={pokemonState.isLoading}
                />
                <div style={{ textAlign: 'center' }}>
                    {pokemonState.notFound ? (
                        <div>No data were found.</div>
                    ) : (
                        <>
                            {pokemonState.isLoading === false ? (
                                <>
                                    <Grid
                                        pokemons={pokemonState.pokemons.slice(
                                            pg * rpg,
                                            pg * rpg + rpg
                                        )}
                                    />
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 50]}
                                        component="div"
                                        count={pokemonState.pokemons.length}
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
