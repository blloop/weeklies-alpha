import React from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import Modal from './Modal';
import AMDropdown from './AMDropdown';

const EventDialog = props => (
    <>
        {props.isOpen &&
            <div className='addevents overlay rounded'>
                <Modal
                    zIndex={12}
                    setDialog={props.setDialog}>
                </Modal>
                <p className='header rounded'> Add Event </p>
                <button
                    onClick={() => props.setDialog(null)}
                    className='close-button'>
                    &#10005;
                </button>
                <div className='text-container'>
                    <p> Name of Event: </p>
                    <input
                        onChange={(event) => props.editUpcoming({
                            ...props.tempEvent,
                            title: event.target.value
                        })}
                        value={props.tempEvent.title}>
                    </input>
                </div>
                <div className='row-items'>
                    <DayDropdown
                        changeDay={(day) => props.editUpcoming({
                            ...props.tempEvent,
                            day: day
                        })}
                        day={props.tempEvent.day}>
                    </DayDropdown>
                    <div className='time-items'>
                        <HourDropdown
                            changeHour={(hour) => props.editUpcoming({
                                ...props.tempEvent,
                                start:
                                    hour +
                                    props.tempEvent.start -
                                    (props.tempEvent.start % 2)
                            })}
                            hour={props.tempEvent.start % 2}
                            format={props.format}>
                        </HourDropdown>
                        <MinDropdown
                            changeMin={() => props.editUpcoming({
                                ...props.tempEvent,
                                start:
                                    props.tempEvent.start % 2 === 0 ?
                                        props.tempEvent.start + 1 :
                                        props.tempEvent.start - 1
                            })}
                            min={
                                props.tempEvent.start % 2
                            }>
                        </MinDropdown>
                        <AMDropdown
                            changeAM={() => props.editUpcoming({
                                ...props.tempEvent,
                                start: tempEvent.start + 24 % 48
                            })}
                            isAM={props.tempEvent.start < 24}
                            format={props.format}>
                        </AMDropdown>
                    </div>
                </div>
                <div className='time-items'>
                    <HourDropdown
                        changeHour={(hour) => props.editUpcoming({
                            ...props.tempEvent,
                            end:
                                hour +
                                props.tempEvent.end -
                                (props.tempEvent.end % 2)
                        })}
                        hour={props.tempEvent.end % 2}
                        format={props.format}>
                    </HourDropdown>
                    <MinDropdown
                        changeMin={() => props.editUpcoming({
                            ...props.tempEvent,
                            end:
                                props.tempEvent.end % 2 === 0 ?
                                    props.tempEvent.end + 1 :
                                    props.tempEvent.end - 1
                        })}
                        min={
                            props.tempEvent.end % 2
                        }>
                    </MinDropdown>
                    <AMDropdown
                        changeAM={() => props.editUpcoming({
                            ...props.tempEvent,
                            end: tempEvent.end + 24 % 48
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
        }
    </>
);

export default EventDialog;