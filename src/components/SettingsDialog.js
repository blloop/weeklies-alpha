import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const SettingsDialog = props => {
    const [confirm, setConfirm] = useState(false);
    const confirmDel = () => {
        setConfirm(false);
        props.clearEvents();
    };

    return ( <>
        {props.isOpen && <>
            <div
                className='modal-bg'
                style={{ zIndex: 12 }}
                onClick={() => props.setDialog('')}/>
            <div className='settings overlay'>
                <button
                    onClick={() => props.setDialog('')}
                    className='close-button'>
                    &#10005;
                </button>
                <p className='header'> Settings </p>
                <div className='settings-row'>
                    <p> Use 24 Hour Time </p>
                    <input
                        type={'checkbox'}
                        checked={props.format}
                        onChange={props.toggleFormat}>
                    </input>
                </div>
                <button
                    className='contrast thin-button'
                    onClick={() => setConfirm(true)}>
                    Clear Events
                </button>
            </div>
            <ConfirmDialog
                allEvents={true}
                isOpen={confirm}
                close={() => setConfirm(false)}
                clickEvent={confirmDel}/>
        </>
        }
    
    </>
    );
};

export default SettingsDialog;
