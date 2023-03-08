import React from 'react';

const HourDropdown = props => {
    const HoursList = (format) => (
        format ? [
                0, 1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23
            ] : [
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12
    ]);

    return (
        <div className='drop-container'>
            <button
                className='drop-box top-button square small'
                onClick={props.toggleMenu}>
                {props.format ?
                    props.hour / 2 :
                    (props.hour / 2) % 12 === 0 ?
                        12 : (props.hour / 2) % 12
                }
            </button>
            {props.isOpen && (
                <ul className='dropdown wide'>
                    {HoursList(props.format).map((hour) =>
                        <button
                            key={hour}
                            className='drop-box square small'
                            onClick={() => {
                                props.toggleMenu();
                                props.changeHour(
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
    );
}

export default HourDropdown;