import React from 'react';

const AMDropdown = props => (
    <>
        {props.format ? null :
            <button
                className='drop-box top-button square small'
                onClick={props.changeAM}>
                {props.isAM ? 'AM' : 'PM'}
            </button>
        }
    </>
)

export default AMDropdown;