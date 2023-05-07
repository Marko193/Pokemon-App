import * as React from 'react';
import { useEffect, useState } from 'react';
import Title from './components/title';
import './App.css';
import Search from './components/search';
import Grid from './layout/grid';
import { CircularProgress, Container, TablePagination } from '@mui/material';
import axios from 'axios';

export default function App() {
    const [pokemons, setPokemons] = useState([]);
    const [total, setTotal] = useState(0);
    const [notFound, setNotFound] = useState(false);
    const [search, setSearch] = useState([]);
    const [searching, setSearching] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSearch = async (textSearch) => {
        if (!textSearch) {
            setSearch([]);
            setNotFound(false);
            return;
        }

        setNotFound(false);
        setSearching(true);

        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`
        );

        if (!data) {
            setNotFound(true);
            return;
        } else {
            setSearch([data]);
        }
        setSearching(false);
    };

    const showPokemons = async (limit, offset) => {
        console.log('limit', limit);
        console.log('offset', offset);
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        const promises = data.results.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
        });

        const results = await Promise.all(promises);
        console.log('results.length', results.length);

        setSearch([]);
        setPokemons(results);
        setNotFound(false);
        setTotal(total + results.length);
    };

    const nextPokemon = () => {
        console.log('active');
        // console.log('rowsPerPage', rowsPerPage);
        showPokemons(10, total);
    };

    useEffect(() => {
        if (!searching) {
            showPokemons(rowsPerPage, 0);
        }
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = async (event) => {
        console.log('event.target.value', event.target.value, total);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        await showPokemons(event.target.value, 0);
        console.log('event.target.value', event.target.value, total);
    };

    const pokemonsList = search.length > 0 ? search : pokemons;

    // console.log('rowsPerPage', rowsPerPage);
    // console.log('page', page);
    // console.log('total', total);

    return (
        <>
            <Container>
                <Title title="PokeApi React App" />
                <Search onHandleSearch={handleSearch} />
                <div style={{ textAlign: 'center' }}>
                    {notFound ? (
                        <div>Pokemon not found</div>
                    ) : (
                        <>
                            {pokemonsList.length !== 0 ? (
                                <>
                                    <Grid
                                        pokemons={pokemonsList}
                                        next={nextPokemon}
                                    />
                                    <TablePagination
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            margin: '0 20px 20px 0',
                                            '.MuiTablePagination-displayedRows':
                                                {
                                                    margin: 0,
                                                },
                                            '.MuiTablePagination-selectLabel': {
                                                margin: 0,
                                            },
                                        }}
                                        page={page}
                                        count={pokemonsList.length}
                                        rowsPerPage={rowsPerPage}
                                        onPageChange={() => handleChangePage}
                                        rowsPerPageOptions={[10, 20, 50]}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                        labelRowsPerPage="Rows per page"
                                        labelDisplayedRows={({
                                            from,
                                            to,
                                            count,
                                        }) => `${from}-${to} of ${count}`}
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
