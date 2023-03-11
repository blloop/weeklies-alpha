import React from "react";

const ConfirmDialog = props => {
    return ( <>
        {props.isOpen && <>
            <div
                className='modal-bg'
                style={{ zIndex: 14 }}
                onClick={() => props.setDialog('')}>
            </div>
            <div className='dialog overlay'>
                <button
                    onClick={() => props.clickEvent()}
                    className='close-button'>
                    &#10005;
                </button>
                <p className='warning'> Warning! </p>
                <p> Are you sure you want to delete 
                    {props.allEvents ? ' all events?' : ' this event?'}
                </p>
                {props.text}
            </div>
        </>}
    </>
    );
}

export default ConfirmDialog;