import React from 'react';

const MinDropdown = props => (
    <button
        className='drop-box top-button square small'
        onClick={props.changeMin}>
        {props.min === 0 ? '00' : '30'}
    </button>
);

export default MinDropdown;