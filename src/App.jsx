import * as React from 'react';
import { useEffect, useState } from 'react';
import Title from './components/title';
import './App.css';
import Search from './components/search';
import Grid from './layout/grid';
import { CircularProgress, Container, TablePagination } from '@mui/material';
import axios from 'axios';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function createData(events, dates) {
    return { events, dates };
}

const rows = [
    createData('Technical Scripter', '13 October'),
    createData('Gate Mock', '5 November'),
    createData('Bi Wizard', '26 November'),
    createData('Job-A-Thon14', '21 October'),
    createData('GFG Hiring', '15 October'),
    createData('TechnicalScripter', '13 October'),
    createData('Gate Mock Exam', '5 November'),
    createData('Bi Wizard School', '26 November'),
    createData('Job-A-Thon 14', '21 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
    createData('GFG Hiring Challenge', '15 October'),
];

console.log('rows', rows);

export default function App() {
    const [pokemons, setPokemons] = useState([]);
    const [total, setTotal] = useState(0);
    const [notFound, setNotFound] = useState(false);
    const [search, setSearch] = useState([]);
    const [searching, setSearching] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //-----

    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    //------

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

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };
    //
    // const handleChangeRowsPerPage = async (event) => {
    //     console.log('event.target.value', event.target.value, total);
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    //     await showPokemons(event.target.value, 0);
    //     console.log('event.target.value', event.target.value, total);
    // };

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
                                    <div>
                                        {rows
                                            .slice(pg * rpg, pg * rpg + rpg)
                                            .map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.events}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.dates}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </div>

                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 50]}
                                        component="div"
                                        count={rows.length}
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
