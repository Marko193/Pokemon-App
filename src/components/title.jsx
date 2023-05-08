import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ title }) {
    return (
        <div className="navbar">
            <span className="navbar__title">{title}</span>
        </div>
    );
}

Title.propTypes = {
    title: PropTypes.string,
};
