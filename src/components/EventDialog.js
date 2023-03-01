import React from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import AMDropdown from './AMDropdown';

const EventDialog = props => (
    <>
        {props.isOpen &&
            <>
                <div
                    className='modal-bg'
                    style={{ zIndex: 12 }}
                    onClick={() => props.setDialog(null)}>
                </div>
                <div className='addevents overlay rounded'>
                    <p className='header rounded'>
                        {props.type === 'add' ?
                            'Add Event' :
                            'Edit Event'
                        }
                    </p>
                    <button
                        onClick={() => props.setDialog(null)}
                        className='close-button'>
                        &#10005;
                    </button>
                    <div className='text-container'>
                        <p> Name of Event: </p>
                        <input
                            onChange={(event) => props.changeUpcoming({
                                ...props.tempEvent,
                                title: event.target.value
                            })}
                            value={props.tempEvent.title}>
                        </input>
                    </div>
                    <div className='row-items'>
                        <DayDropdown
                            changeDay={(day) => props.changeUpcoming({
                                ...props.tempEvent,
                                day: day
                            })}
                            day={props.tempEvent.day}>
                        </DayDropdown>
                        <div className='time-items'>
                            <HourDropdown
                                changeHour={(hour) => props.changeUpcoming({
                                    ...props.tempEvent,
                                    start:
                                        hour +
                                        (props.tempEvent.start % 2)
                                })}
                                hour={
                                    props.tempEvent.start -
                                    (props.tempEvent.start % 2)
                                }
                                format={props.format}>
                            </HourDropdown>
                            <MinDropdown
                                changeMin={() => props.changeUpcoming({
                                    ...props.tempEvent,
                                    start:
                                        (props.tempEvent.start % 2 === 0 ?
                                            props.tempEvent.start + 1 :
                                            props.tempEvent.start - 1) % 48
                                })}
                                min={
                                    props.tempEvent.start % 2
                                }>
                            </MinDropdown>
                            <AMDropdown
                                changeAM={() => props.changeUpcoming({
                                    ...props.tempEvent,
                                    start: (props.tempEvent.start + 24) % 48
                                })}
                                isAM={props.tempEvent.start < 24}
                                format={props.format}>
                            </AMDropdown>
                        </div>
                    </div>
                    <div className='time-items'>
                        <HourDropdown
                            changeHour={(hour) => props.changeUpcoming({
                                ...props.tempEvent,
                                end:
                                    hour +
                                    (props.tempEvent.end % 2)
                            })}
                            hour={
                                props.tempEvent.end -
                                (props.tempEvent.end % 2)
                            }
                            format={props.format}>
                        </HourDropdown>
                        <MinDropdown
                            changeMin={() => props.changeUpcoming({
                                ...props.tempEvent,
                                end:
                                    (props.tempEvent.end % 2 === 0 ?
                                        props.tempEvent.end + 1 :
                                        props.tempEvent.end - 1) % 48
                            })}
                            min={
                                props.tempEvent.end % 2
                            }>
                        </MinDropdown>
                        <AMDropdown
                            changeAM={() => props.changeUpcoming({
                                ...props.tempEvent,
                                end: (props.tempEvent.end + 24) % 48
                            })}
                            isAM={props.tempEvent.end < 24}
                            format={props.format}>
                        </AMDropdown>
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
                </div>
            </>
        }
    </>
);

export default EventDialog;