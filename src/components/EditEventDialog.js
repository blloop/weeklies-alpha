import React, { Component } from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import ToggleAM from './ToggleAM';

class EditEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog
        };
    }

    // Updates value of text field
    updateText = (event) => {
        let tempEvent = {
            ...this.props.newEvent,
            inputText: event.target.value
        };
        this.props.setNewEvent(tempEvent);
    };

    // Set current value for day of the week
    changeDay = (day) => {
        let tempEvent = {
            ...this.props.newEvent,
            dayOfWeek: day
        }
        this.props.setNewEvent(tempEvent);
    }

    // Sets current hour of event
    changeHour = (hour) => {
        let tempEvent = {
            ...this.props.newEvent,
            newHour: hour
        };
        this.props.setNewEvent(tempEvent);
    }

    // Sets current minute of event
    // Intervals of 0:30, represented by bool
    changeMin = () => {
        let tempEvent = {
            ...this.props.newEvent,
            isZero: !this.props.newEvent.isZero
        };
        this.props.setNewEvent(tempEvent);
    }

    // Sets current state of the hour AM/PM
    // Only valid if 24 hour time is not in use
    changeAM = () => {
        let tempEvent = {
            ...this.props.newEvent,
            newHour: (this.props.newEvent.newHour < 12 ?
                this.props.newEvent.newHour + 12 :
                this.props.newEvent.newHour - 12
            )
        };
        this.props.setNewEvent(tempEvent);
    }


    // Sets current hour of event #2
    changeHour2 = (hour) => {
        let tempEvent = {
            ...this.props.newEvent,
            newHour2: hour
        };
        this.props.setNewEvent(tempEvent);
    }

    // Sets current minute of event #2
    // Intervals of 0:30, represented by bool
    changeMin2 = () => {
        let tempEvent = {
            ...this.props.newEvent,
            isZero2: !this.props.newEvent.isZero2
        };
        this.props.setNewEvent(tempEvent);
    }

    // Sets current state of the hour AM/PM #2
    // Only valid if 24 hour time is not in use
    changeAM2 = () => {
        let tempEvent = {
            ...this.props.newEvent,
            newHour2: (this.props.newEvent.newHour2 < 12 ?
                this.props.newEvent.newHour2 + 12 :
                this.props.newEvent.newHour2 - 12
            )
        };
        this.props.setNewEvent(tempEvent);
    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='addevents overlay rounded'>
                        <p className='header rounded'> Edit Event </p>
                        <button
                            onClick={this.props.closeModal}
                            className='close-button'>
                            &#10005;
                        </button>
                        <div className='text-container'>
                            <p> Name of Event: </p>
                            <input
                                onChange={this.updateText}
                                value={this.props.newEvent.inputText}>
                            </input>
                        </div>
                        <div className='row-items'>
                            <DayDropdown
                                changeDay={this.changeDay}
                                dayOfWeek={this.props.newEvent.dayOfWeek}>
                            </DayDropdown>
                            <div className='time-items'>
                                <HourDropdown
                                    changeHour={this.changeHour}
                                    isAM={this.props.newEvent.newHour < 12}
                                    newHour={this.props.newEvent.newHour}
                                    useMilitary={this.props.useMilitary}>
                                </HourDropdown>
                                <MinDropdown
                                    isZero={this.props.newEvent.isZero}
                                    changeMin={this.changeMin}>
                                </MinDropdown>
                                <ToggleAM
                                    changeAM={this.changeAM}
                                    isAM={this.props.newEvent.newHour < 12}
                                    useMilitary={this.props.useMilitary}>
                                </ToggleAM>
                            </div>
                        </div>
                        <div className='time-items'>
                            <HourDropdown
                                changeHour={this.changeHour2}
                                isAM={this.props.newEvent.newHour2 < 12}
                                newHour={this.props.newEvent.newHour2}
                                useMilitary={this.props.useMilitary}>
                            </HourDropdown>
                            <MinDropdown
                                isZero={this.props.newEvent.isZero2}
                                changeMin={this.changeMin2}>
                            </MinDropdown>
                            <ToggleAM
                                changeAM={this.changeAM2}
                                isAM={this.props.newEvent.newHour2 < 12}
                                useMilitary={this.props.useMilitary}>
                            </ToggleAM>
                        </div>
                        <button
                            className='contrast-light thin-button'
                            onClick={this.props.editEvent}>
                            Edit Event
                        </button>
                        <button
                            className='contrast thin-button'
                            onClick={this.props.deleteEvent}>
                            Delete Event
                        </button>
                    </div>
                }
            </>
        );
    }
}

export default EditEventDialog;