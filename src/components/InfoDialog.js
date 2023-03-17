import React from "react";

const InfoDialog = props => (props.isOpen &&
    <>
        <div
            className='modal-bg'
            style={{ zIndex: 14 }}
            onClick={() => props.setDialog('')}/>
        <div className='dialog overlay info'>
            <button
                onClick={() => props.setDialog('')}
                className='close-button'>
                &#10005;
            </button>
            <p className='header'> How to use this app </p>
            <p> Select a time cell </p>
            <div className='sel'></div>
            <p> Enter the event details </p>
            <input readOnly value={'Meeting'}/>
            <p> Click the add event button</p>
            <button
                className='add contrast-light thin-button'>
                Add Event
            </button>
            <p> Next &gt; &gt; </p>
        </div>
    </>
);


export default InfoDialog;