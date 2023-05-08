import React, { useState } from 'react';
import PokeballImage from '../assets/icons/pokeball.png';
import { any } from 'prop-types';
import { searchIcon } from '../utils/searchIcon';
import { Modal } from '@mui/material';
import ModalContent from './modalContent';
import { addCapitalLetter } from '../utils/general';

export default function Card({ pokemon }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // console.log('pokemon', pokemon);

    return (
        <>
            <div
                className="card"
                onClick={handleOpen}
                style={{
                    backgroundColor: `var(--bg-poke-color-light-${pokemon.types[0].type.name})`,
                }}
            >
                <div className="card__title">
                    <img
                        className="card__title-img"
                        src={PokeballImage}
                        alt=""
                    />
                    <span className="card__title-text">{`#${pokemon.order}`}</span>
                </div>
                <div
                    className="card__badge"
                    style={{
                        backgroundColor: `var(--bg-poke-color-dark-${pokemon.types[0].type.name})`,
                    }}
                >
                    <img
                        className="card__badge-Icon"
                        src={searchIcon(pokemon.types[0].type.name)}
                        alt=""
                    />
                </div>
                <div className="card__title-image-block">
                    <h3 className="card__name">
                        {addCapitalLetter(pokemon.name)}
                    </h3>
                    <img
                        className="card__image"
                        width={120}
                        height={120}
                        src={pokemon.sprites['front_default']}
                        alt=""
                        loading="lazy"
                    />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalContent pokemon={pokemon} />
            </Modal>
        </>
    );
}

Card.propTypes = {
    pokemon: any,
};
