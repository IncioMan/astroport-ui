import React from 'react';
import './AnimalCard.css'
import PropTypes from 'prop-types';

export default function AnimalCard(props) {
    const { name } = props;
    return <h2>{name}</h2>
}