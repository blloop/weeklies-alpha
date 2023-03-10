import React, { useState } from 'react';
import TimeRow from './TimeRow';
import { dayList } from './Data';

const EventDialog = props => {
    const [menu, setMenu] = useState('');
    const toggleMenu = (name) => {
        setMenu(menu === name ? '' : name);
    }

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
                    <input onChange={(event) => 
                        props.setUpcoming({
                            ...props.tempEvent,
                            title: event.target.value
                        })}
                        value={props.tempEvent.title}>
                    </input>
                </div>
                <div className='row-items'>
                    <button
                        className='drop-box top-button square'
                        onClick={() => 
                            setMenu(menu === 'day' ? 
                                '' : 
                                'day'
                            )}>
                        {props.tempEvent.day}
                    </button>
                    {menu === 'day' && (
                        <ul className='dropdown'> 
                            {dayList.map((day) =>
                                <button
                                    hidden={day === 
                                        props.tempEvent.day
                                    }
                                    key={day}
                                    className='drop-box square'
                                    onClick={() => {
                                        toggleMenu('day');
                                        props.setUpcoming({
                                            ...props.tempEvent,
                                            day: day
                                        });
                                    }}>
                                {day}
                                </button>
                            )}
                        </ul>
                    )}
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
                <TimeRow
                    field={'end'}
                    menu={menu}
                    hour={
                        props.tempEvent.end -
                        (props.tempEvent.end % 2)
                    }
                    setMenu={setMenu}
                    setUpcoming={props.setUpcoming}
                    tempEvent={props.tempEvent}
                    format={props.format}
                />
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