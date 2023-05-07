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
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);

    const handleChangePage = (event, newpage) => {
        setpg(newpage);
    };

    const handleChangeRowsPerPage = (event) => {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    };

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
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        const promises = data.results.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return response.data;
        });

        const results = await Promise.all(promises);

        setSearch([]);
        setPokemons(results);
        setNotFound(false);
        setTotal(total + results.length);
    };

    useEffect(() => {
        if (!searching) {
            // if we have more time - we can add ability to upload new pokemons, if we watched more than 500 - add + 200 to the old ones
            showPokemons(200, 0);
        }
    }, []);

    const pokemonsList = search.length > 0 ? search : pokemons;
    return (
        <>
            <Container>
                <Title title="PokeApi React App" />
                <Search onHandleSearch={handleSearch} />
                <div style={{ textAlign: 'center' }}>
                    {notFound ? (
                        <div>No data were found.</div>
                    ) : (
                        <>
                            {pokemonsList.length !== 0 ? (
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
