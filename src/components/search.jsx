import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, InputBase, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Search({ onHandleSearch }) {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            onHandleSearch(null);
        }
    };

    const handleClickSearch = (e) => {
        if (e.keyCode === 13 || e.type === 'click') {
            e.preventDefault();
            onHandleSearch(search);
        }
    };

    return (
        <div className="search">
            <div className="search__wrapper">
                <Paper
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '95%',
                        height: '40px',
                    }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{
                            width: '100%',
                            fontFamily: 'Open Sans, sans-serif !important',
                            fontWeight: 'bold',
                        }}
                        placeholder="Enter pokemon's ID or name..."
                        onChange={handleSearch}
                        onKeyDown={handleClickSearch}
                        autoFocus
                    />
                </Paper>
            </div>
            <Button
                variant="contained"
                disabled={search === ''}
                onClick={handleClickSearch}
                sx={{
                    fontFamily: 'Open Sans, sans-serif !important',
                    fontWeight: 'bold',
                }}
            >
                Search
            </Button>
        </div>
    );
}

Search.propTypes = {
    onHandleSearch: PropTypes.any,
};
