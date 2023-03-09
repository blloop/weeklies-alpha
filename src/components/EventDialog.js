import React, { useState } from 'react';
import TimeRow from './TimeRow';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';

const EventDialog = props => {
    const [menu, setMenu] = useState('');

    return ( <>
        {props.isOpen && <>
            <div
                className='modal-bg'
                style={{ zIndex: 12 }}
                onClick={() => props.setDialog('')}>
            </div>
            <div className='addevents overlay rounded'>
                <p className='header rounded'>
                    {props.type === 'add' ?
                        'Add Event' :
                        'Edit Event'
                    }
                </p>
                <button
                    onClick={() => props.setDialog('')}
                    className='close-button'>
                    &#10005;
                </button>
                <div className='text-container'>
                    <p> Name of Event: </p>
                    <input
                        onChange={(event) => 
                            props.setUpcoming({
                                ...props.tempEvent,
                                title: event.target.value
                        })}
                        value={props.tempEvent.title}>
                    </input>
                </div>
                <div className='row-items'>
                    <DayDropdown
                        isOpen={menu === 'day'}
                        toggleMenu={() => {
                            menu === 'day' ? 
                                setMenu('') :
                                setMenu('day')
                        }}
                        changeDay={(day) => 
                            props.setUpcoming({
                                ...props.tempEvent,
                                day: day
                        })}
                        day={props.tempEvent.day}>
                    </DayDropdown>
                    <TimeRow
                        field={'start'}
                        menu={menu}
                        hour={
                            props.tempEvent.start -
                            (props.tempEvent.start % 2)
                        }
                        setMenu={setMenu}
                        setUpcoming={props.setUpcoming}
                        tempEvent={props.tempEvent}
                        format={props.format}
                    />
                </div>
                <div className='time-items'>
                    <HourDropdown
                            isOpen={menu === 'hour2'}
                            toggleMenu={() => {menu === 'hour2' ? 
                                setMenu('') :
                                setMenu('hour2')
                            }}
                        changeHour={(hour) => props.setUpcoming({
                            ...props.tempEvent,
                            end:
                                (props.format ? hour * 2 : hour) +
                                (props.tempEvent.end % 2)
                        })}
                        hour={
                            props.tempEvent.end -
                            (props.tempEvent.end % 2)
                        }
                        format={props.format}>
                    </HourDropdown>
                    <button
                        className='drop-box top-button square small'
                        onClick={() => props.setUpcoming({
                            ...props.tempEvent,
                            end:
                                (props.tempEvent.end % 2 === 0 ?
                                    props.tempEvent.end + 1 :
                                    props.tempEvent.end - 1) % 48
                        })}>
                        {props.tempEvent.end % 2 === 0 ? '00' : '30'}
                    </button>
                    {!props.format &&
                        <button
                            className='drop-box top-button square small'
                            onClick={() => props.setUpcoming({
                                ...props.tempEvent,
                                end: (props.tempEvent.end + 24) % 48
                            })}>
                            {(
                                props.tempEvent.end < 24 || 
                                props.tempEvent.end === 48) ? 
                                'AM' : 'PM'
                            }
                        </button>
                    }
                </div>
                {
                    props.type === 'add' ?
                        <button
                            className='contrast-light thin-button'
                            onClick={props.addEvent}>
                            Add Event
                        </button> :
                        <button
                            className='contrast-light thin-button'
                            onClick={props.editEvent}>
                            Edit Event
                        </button>
                }
                {
                    props.type === 'edit' &&
                    <button
                        className='contrast thin-button'
                        onClick={props.deleteEvent}>
                        Delete Event
                    </button>
                }
            </div>
        </>}
    </>
    );
};

export default EventDialog;