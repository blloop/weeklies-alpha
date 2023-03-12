import React from "react";

const ConfirmDialog = props => {
    return ( <>
        {props.isOpen && <>
            <div
                className='modal-bg'
                style={{ zIndex: 14 }}
                onClick={() => props.close()}>
            </div>
            <div className='dialog overlay confirm'>
                <button
                    onClick={() => props.close()}
                    className='close-button'>
                    &#10005;
                </button>
                <p className='warning'> Warning! </p>
                <p> Are you sure you want to delete 
                    {props.allEvents ? 
                        ' all events?' : 
                        ' this event?'
                    }
                </p>
                <button
                    onClick={props.clickEvent}
                    className='contrast thin-button'>
                    {props.allEvents ? 
                    'Clear events' : 
                    'Delete event'}
                </button>
            </div>
        </>}
    </>
    );
};

export default ConfirmDialog;