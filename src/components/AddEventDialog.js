import React, { Component } from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import Modal from './Modal';
import WarningDialog from './WarningDialog';
import ToggleAM from './ToggleAM';

let dayList = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
]

class AddEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        };
    }

    // Add an event to dialog
    // Sends request to top level component
    addToList = () => {
        let eventID =
            (dayList.indexOf(this.props.newEvent.dayOfWeek) * 48) +
            this.props.newEvent.newHour * 2 +
            (this.props.newEvent.isZero ? 0 : 1);
        let newEvent = {
            id: eventID,
            title: this.props.newEvent.inputText,
            day: this.props.newEvent.dayOfWeek,
            hour: this.props.newEvent.newHour,
            min: (this.props.newEvent.isZero ? 0 : 30),
            hour2: (
                (this.props.newEvent.newHour2 === 0
                    && this.props.newEvent.newHour > this.props.newEvent.newHour2
                    && this.props.newEvent.isZero2) ?
                    24 :
                    this.props.newEvent.newHour2
            ),
            min2: (this.props.newEvent.isZero2 ? 0 : 30)
        };
        this.props.addEvent(newEvent);
    }

    addByName = () => {
        this.props.addByName(this.state.inputText);
    }

    // Updates value of text field
    // and stores as part of state
    updateText = (event) => {
        let newState = {
            inputText: event.target.value
        };
        this.setState(newState);
    }

    // Set event to specified day of week
    changeDay = (day) => {
        let newDefault = {
            ...this.props.newEvent,
            dayOfWeek: day
        };
        this.props.updateDefault(newDefault);
    }

    // Sets current hour of event start time
    changeHour = (hour) => {
        let newDefault = {
            ...this.props.newEvent,
            newHour: hour
        };
        this.props.updateDefault(newDefault);
    }

    // Sets current minute of event start time
    // Intervals of 0:30, represented by bool
    changeMin = () => {
        let newDefault = {
            ...this.props.newEvent,
            isZero: !this.props.newEvent.isZero
        };
        this.props.updateDefault(newDefault);
    }

    // Sets current state of the hour (AM/PM)
    // for the event start time
    // Only valid if 24 hour time is not in use
    changeAM = () => {
        let newDefault = {
            ...this.props.newEvent,
            newHour: (this.props.newEvent.newHour < 12 ?
                this.props.newEvent.newHour + 12 :
                this.props.newEvent.newHour - 12
            )
        };
        this.props.updateDefault(newDefault);
    }


    // Sets current hour of event end time
    changeHour2 = (hour) => {
        let newDefault = {
            ...this.props.newEvent,
            newHour2: hour
        };
        this.props.updateDefault(newDefault);
    }

    // Sets current minute of event end time
    // Intervals of 0:30, represented by bool
    changeMin2 = () => {
        let newDefault = {
            ...this.props.newEvent,
            isZero2: !this.props.newEvent.isZero2
        };
        this.props.updateDefault(newDefault);
    }

    // Sets current state of the hour (AM/PM)
    // for the event end time
    // Only valid if 24 hour time is not in use
    changeAM2 = () => {
        let newDefault = {
            ...this.props.newEvent,
            newHour2: (this.props.newEvent.newHour2 < 12 ?
                this.props.newEvent.newHour2 + 12 :
                this.props.newEvent.newHour2 - 12
            )
        };
        this.props.updateDefault(newDefault);
    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='addevents overlay rounded'>
                        <Modal></Modal>
                        <WarningDialog></WarningDialog>
                        <p className='header rounded'> Add Event </p>
                        <button
                            onClick={this.props.closeModal}
                            className='close-button'>
                            &#10005;
                        </button>
                        <div className='text-container'>
                            <p> Name of Event: </p>
                            <input
                                onChange={this.updateText}
                                value={this.state.inputText}>
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
                            onClick={this.addByName}>
                            Add Event
                        </button>
                    </div>
                }
            </>
        );
    }

}

export default AddEventDialog;