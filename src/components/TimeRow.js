import React from 'react';

const TimeRow = props => {
    const HoursList = (format) => (
        format ? [
                0, 1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23
            ] : [
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12
    ]);
    const toggleMenu = () => {
        props.menu === (props.field) ? 
            props.setMenu('') :
            props.setMenu(props.field)
    }
    const changeHour = (hour) => {
        let newEvent = props.tempEvent;
        newEvent[props.field] = 
            (props.format ? hour * 2 : hour) +
            (props.tempEvent[props.field] % 2); 
        props.setUpcoming(newEvent);
    }
    return (
        <div className='time-items'>
            <div className='drop-container'>
                <button
                    className='drop-box top-button square small'
                    onClick={toggleMenu}>
                    {props.format ?
                        (props.tempEvent[props.field] -
                            (props.tempEvent[props.field] % 2)) / 2 :
                        ((props.tempEvent[props.field] -
                            (props.tempEvent[props.field] % 2))/ 2) % 12 === 0 ?
                            12 : ((props.tempEvent[props.field] -
                                (props.tempEvent[props.field] % 2)) / 2) % 12
                    }
                </button>
                {props.menu === (props.field) && (
                    <ul className='dropdown wide'>
                        {HoursList(props.format).map((hour) =>
                            <button
                                key={hour}
                                className='drop-box square small'
                                onClick={() => {
                                    toggleMenu();
                                    changeHour(
                                        props.format ?
                                            hour :
                                            (hour === 12 ? 0 : hour * 2) +
                                            (props.hour < 24 ? 0 : 24)
                                    );
                                }}>
                                {hour}
                            </button>
                        )}
                    </ul>
                )}
            </div>
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