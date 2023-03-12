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
    const toggleHour = () => {
        props.menu === (props.field) ? 
            props.setMenu('') :
            props.setMenu(props.field)
    };
    const getHour = (format, time) => {
        return (format ?
            (time - (time % 2)) / 2 : 
            (((time - (time % 2))/ 2) % 12 === 0 ? 
                12 : 
                ((time -(time % 2)) / 2) % 12)
        );
    };
    const changeHour = (hour) => {
        let newEvent = props.tempEvent;
        newEvent[props.field] = 
            (props.format ? hour * 2 : hour) +
            (props.tempEvent[props.field] % 2); 
        props.setUpcoming(newEvent);
    };
    const toggleMin = () => {    
        props.setUpcoming(
            (props.field === 'start') ?
            { ...props.tempEvent,
            start: (props.tempEvent.start % 2 === 0 ?
                props.tempEvent.start + 1 % 48:
                props.tempEvent.start - 1 % 48),
            } :
            { ...props.tempEvent,
            end: (props.tempEvent.end % 2 === 0 ?
                props.tempEvent.end + 1 % 48:
                props.tempEvent.end - 1 % 48)
            }
        );
    };
    const toggleAM = () => {
        props.setUpcoming(
            (props.field === 'start' ? 
            { ...props.tempEvent,
                start: (props.tempEvent.start + 24) % 48
            } :
            { ...props.tempEvent,
                end: (props.tempEvent.end + 24) % 48
            }
            )
        );
    };

    return (
        <div className='time-items'>
            <div className='drop-container'>
                <button
                    className='drop-box top-button square small'
                    onClick={toggleHour}>
                    {getHour(
                        props.format, 
                        props.tempEvent[props.field]
                    )}
                </button>
                {props.menu === (props.field) && (
                    <ul className='dropdown wide'>
                        {HoursList(props.format).map((hour) =>
                            <button
                                key={hour}
                                className='drop-box square small'
                                onClick={() => {
                                    toggleHour();
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
                onClick={() => toggleMin()}>
                {props.tempEvent[props.field] % 2 === 0 ? '00' : '30'}
            </button>                               
            {!props.format &&
                <button
                    className='drop-box top-button square small'
                    onClick={() => {toggleAM()}}>
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