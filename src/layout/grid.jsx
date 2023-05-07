import React from 'react';
import Card from '../components/card';
import PropTypes, { any, array } from 'prop-types';
import Search from '../components/search';

export default function Grid({ pokemons, next }) {
    const handleButton = () => {
        next();
    };

    return (
        <div className="grid">
            <div className="grid__pokemon">
                {pokemons.map((poke) => (
                    <Card key={poke.name} pokemon={poke} />
                ))}
            </div>
            {pokemons.length >= 20 && (
                <div className="grid__wrapper-button">
                    <button
                        className="grid__button"
                        type="button"
                        onClick={handleButton}
                    >
                        Show more
                    </button>
                </div>
            )}
        </div>
    );
}

Grid.propTypes = {
    pokemons: any,
    next: PropTypes.any,
};
