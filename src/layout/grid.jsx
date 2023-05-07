import React from 'react';
import Card from '../components/card';
import PropTypes, { any } from 'prop-types';
import Search from '../components/search';

export default function Grid({ pokemons }) {
    return (
        <div className="grid">
            <div className="grid__pokemon">
                {pokemons.map((poke) => (
                    <Card key={poke.name} pokemon={poke} />
                ))}
            </div>
        </div>
    );
}

Grid.propTypes = {
    pokemons: PropTypes.any,
};
