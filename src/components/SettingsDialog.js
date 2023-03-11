import React from 'react';
import { colorNames, darkColors, range } from './Data';

const SettingsDialog = props => (
    <>
        {props.isOpen &&
            <>
                <div
                    className='modal-bg'
                    style={{ zIndex: 12 }}
                    onClick={() => props.setDialog('')}>
                </div>
                <div className='settings overlay'>
                    <button
                        onClick={() => props.setDialog('')}
                        className='close-button'>
                        &#10005;
                    </button>
                    <p className='subtitle'> Settings </p>
                    <hr></hr>
                    <div className='settings-row'>
                        <p> Use 24 Hour Time </p>
                        <input
                            type={'checkbox'}
                            checked={props.format}
                            onChange={props.toggleFormat}>
                        </input>
                    </div>
                    <div className='settings-row'>
                        <p> Accent Color: </p>
                        <div className='color-palette'>
                            {range(colorNames.length).map((n) =>
                                <div
                                    key={n}
                                    style={{
                                        backgroundColor: darkColors[n]
                                    }}
                                    className={
                                        props.accentColor ===
                                            colorNames[n] ?
                                            'current-color' :
                                            ''
                                    }
                                    checked={
                                        props.accentColor ===
                                        colorNames[n]
                                    }
                                    onClick={() =>
                                        props.changeColor(n)
                                    }>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className='contrast thin-button'
                        onClick={props.clearEvents}>
                        Clear Events
                    </button>
                </div>
            </>
        }
    </>
)

export default SettingsDialog;