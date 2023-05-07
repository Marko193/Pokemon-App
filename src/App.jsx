import * as React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Title from './components/title';
import './App.css';
import Search from './components/search';
import Grid from './layout/grid';
import { CircularProgress, Container } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    card: {
        maxWidth: 160,
        height: '100%',
    },
}));

export default function App() {
    const [pokemons, setPokemons] = useState([]);
    const [total, setTotal] = useState(0);
    const [notFound, setNotFound] = useState(false);
    const [search, setSearch] = useState([]);
    const [searching, setSearching] = useState(false);

    const handleSearch = async (textSearch) => {
        if (!textSearch) {
            setSearch([]);
            setNotFound(false);
            return;
        }

        setNotFound(false);
        setSearching(true);

        const api = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${textSearch.toLowerCase()}`
        );

        console.log('api search', api);

        const data = await api.json().catch(() => undefined);
        if (!data) {
            setNotFound(true);
            return;
        } else {
            setSearch([data]);
        }
        setSearching(false);
    };

    const showPokemons = async (limit = 20, offset = 0) => {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        console.log('data', data);

        const promises = data.results.map(async (pokemon) => {
            const result = await fetch(pokemon.url);
            const res = await result.json();
            return res;
        });

        const results = await Promise.all(promises);

        console.log('results', results);

        setSearch([]);
        setPokemons([...pokemons, ...results]);
        setNotFound(false);
        setTotal(total + results.length);
    };

    const nextPokemon = () => {
        showPokemons(20, total);
    };

    useEffect(() => {
        if (!searching) {
            showPokemons();
        }
    }, []);

    const poke = search.length > 0 ? search : pokemons;

    const classes = useStyles();
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
                            {poke.length !== 0 ? (
                                <Grid pokemons={poke} next={nextPokemon} />
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
