import React, { useState } from 'react';
import TimeRow from './TimeRow';
import DayDropdown from './DayDropdown';

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