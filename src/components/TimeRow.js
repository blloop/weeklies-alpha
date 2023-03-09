import React from 'react';
import HourDropdown from './HourDropdown';

const TimeRow = props => {
    return (
        <div className='time-items'>
            <HourDropdown
                isOpen={props.menu === ('h' + props.field)}
                toggleMenu={() => {
                    props.menu === ('h' + props.field) ? 
                        props.setMenu('') :
                        props.setMenu('h' + props.field)
                }}
                changeHour={(hour) => {
                    let newEvent = props.tempEvent;
                    newEvent[props.field] = 
                        (props.format ? hour * 2 : hour) +
                        (props.tempEvent[props.field] % 2); 
                    props.setUpcoming(newEvent);
                }}
                hour={
                    props.tempEvent[props.field] -
                    (props.tempEvent[props.field] % 2)
                }
                format={props.format}>
            </HourDropdown>
            <button
                className='drop-box top-button square small'
                onClick={() => {
                    let newEvent = props.tempEvent;
                    newEvent[props.field] = 
                        (props.tempEvent[props.field] % 2 === 0 ?
                        props.tempEvent[props.field] + 1 :
                        props.tempEvent[props.field] - 1) % 48;
                    props.setUpcoming(newEvent);
                }}>
                {props.tempEvent[props.field] % 2 === 0 ? '00' : '30'}
            </button>                               
            {!props.format &&
                <button
                    className='drop-box top-button square small'
                    onClick={() => {
                        let newEvent = props.tempEvent;
                        newEvent[props.field] = 
                            (props.tempEvent[props.field] + 24) % 48
                        props.setUpcoming(newEvent);
                    }}>
                    {(
                        props.tempEvent[props.field] < 24 || 
                        props.tempEvent[props.field] === 48) ? 
                        'AM' : 'PM'
                    }
                </button>
            }
        </div>
    );
};

export default TimeRow;