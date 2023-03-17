import React from "react";

const InfoDialog = props => (props.isOpen &&
    <>
        <div
            className='modal-bg'
            style={{ zIndex: 14 }}
            onClick={() => props.setDialog('')}/>
        <div className='dialog overlay confirm'>
            <button
                onClick={() => props.setDialog('')}
                className='close-button'>
                &#10005;
            </button>
            <p className='header'> How to use this app </p>
            <ul>
                <li>1. </li>
                <li>1. </li>
                <li>1. </li>
                <div className='info-sel'></div>
            </ul>
        </div>
    </>
);


export default InfoDialog;