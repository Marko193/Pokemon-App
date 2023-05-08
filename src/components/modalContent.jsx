import React from 'react';
import PropTypes from 'prop-types';
import { searchIcon } from '../utils/searchIcon';
import { colors } from '../constants/colors';
import { addCapitalLetter } from '../utils/general';

export default function ModalContent({ pokemon }) {
    console.log('pokemon', pokemon);

    return (
        <div className="modal">
            <div className="modal__content">
                <div
                    className="modal__content-features"
                    style={{
                        backgroundColor: `var(--bg-poke-color-dark-${pokemon.types[0].type.name})`,
                    }}
                >
                    <div className="modal__content-featuresRight">
                        <span className="modal__content-featuresHabitat">
                            <img
                                className="modal__content-featuresImage"
                                src={searchIcon(pokemon.types[0].type.name)}
                                alt=""
                            />
                        </span>
                        {pokemon['past_types'].length > 0 && (
                            <span className="modal__content-featuresGeneration">
                                {pokemon['past_types'][0].generation.name}
                            </span>
                        )}
                    </div>
                    <div className="modal__content-featuresLeft">
                        <span>Height: {pokemon.height}</span>
                        <span>Weight: {pokemon.weight}</span>
                    </div>
                </div>
                <div className="modal__content-description">
                    <img
                        className="modal__content-descriptionImage"
                        src={pokemon.sprites['front_default']}
                        alt=""
                    />
                    <h3 className="modal__content-descriptionTitle">
                        {addCapitalLetter(pokemon.name)}
                    </h3>
                </div>
                <div className="modal__content-other">
                    <div className="modal__content-otherBreadcrumb">
                        <h4 className="modal__content-otherBreadcrumbAbilities">
                            Abilities
                        </h4>
                        {pokemon.abilities.map(({ ability }) => (
                            <span
                                key={ability.name}
                                className="modal__content-otherBreadcrumbAbility"
                            >
                                {addCapitalLetter(ability.name)}
                            </span>
                        ))}
                    </div>
                    <div className="modal__content-otherStats">
                        <h4 className="modal__content-otherStatsTitle">
                            Characteristics
                        </h4>
                        {pokemon.stats.map((stat, index) => (
                            <div
                                className="modal__content-otherStat"
                                key={stat.stat.name}
                            >
                                <div className="modal__content-otherStatContent">
                                    <span className="modal__content-otherStatContentPower">
                                        {addCapitalLetter(stat.stat.name)}
                                    </span>
                                    <span className="modal__content-otherStatContentValue">
                                        {stat.base_stat} / 100
                                    </span>
                                </div>
                                <div className="modal__content-otherStatTimeLine">
                                    {stat.base_stat >= 100 ? (
                                        <div
                                            className="modal__content-otherStatTimeLineStat"
                                            style={{
                                                width: '100%',
                                                backgroundColor: `${colors[index]}`,
                                            }}
                                        ></div>
                                    ) : (
                                        <div
                                            className="modal__content-otherStatTimeLineStat"
                                            style={{
                                                width: `${stat.base_stat}%`,
                                                backgroundColor: `${colors[index]}`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

ModalContent.propTypes = {
    pokemon: PropTypes.object,
};
