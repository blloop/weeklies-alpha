import React, { Component } from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
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
            (dayList.indexOf(this.props.newevent.dayOfWeek) * 48) +
            this.props.newevent.newHour * 2 +
            (this.props.newevent.isZero ? 0 : 1);
        let newEvent = {
            id: eventID,
            title: this.props.newevent.inputText,
            day: this.props.newevent.dayOfWeek,
            hour: this.props.newevent.newHour,
            min: (this.props.newevent.isZero ? 0 : 30),
            hour2: (
                (this.props.newevent.newHour2 === 0
                    && this.props.newevent.newHour > this.props.newevent.newHour2
                    && this.props.newevent.isZero2) ?
                    24 :
                    this.props.newevent.newHour2
            ),
            min2: (this.props.newevent.isZero2 ? 0 : 30)
        };
        this.props.addEvent(newEvent);
    }

    // Updates value of text field
    // and stores as part of state
    updateText = (event) => {
        let newState = {
            ...this.props.newevent,
            inputText: event.target.value
        };
        this.setState(newState);
    }

    // Set event to specified day of week
    changeDay = (day) => {
        let newState = {
            ...this.props.newevent,
            dayOfWeek: day
        };
        this.setState(newState);
    }

    // Sets current hour of event start time
    changeHour = (hour) => {
        let newState = {
            ...this.props.newevent,
            newHour: hour
        };
        this.setState(newState);
    }

    // Sets current minute of event start time
    // Intervals of 0:30, represented by bool
    changeMin = () => {
        let newState = {
            ...this.props.newevent,
            isZero: !this.props.newevent.isZero
        };
        this.setState(newState);
    }

    // Sets current state of the hour (AM/PM)
    // for the event start time
    // Only valid if 24 hour time is not in use
    changeAM = () => {
        let newState = {
            ...this.props.newevent,
            newHour: (this.props.newevent.newHour < 12 ?
                this.props.newevent.newHour + 12 :
                this.props.newevent.newHour - 12
            )
        };
        this.setState(newState);
    }


    // Sets current hour of event end time
    changeHour2 = (hour) => {
        let newState = {
            ...this.props.newevent,
            newHour2: hour
        };
        this.setState(newState);
    }

    // Sets current minute of event end time
    // Intervals of 0:30, represented by bool
    changeMin2 = () => {
        let newState = {
            ...this.props.newevent,
            isZero2: !this.props.newevent.isZero2
        };
        this.setState(newState);
    }

    // Sets current state of the hour (AM/PM)
    // for the event end time
    // Only valid if 24 hour time is not in use
    changeAM2 = () => {
        let newState = {
            ...this.props.newevent,
            newHour2: (this.props.newevent.newHour2 < 12 ?
                this.props.newevent.newHour2 + 12 :
                this.props.newevent.newHour2 - 12
            )
        };
        this.setState(newState);
    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='addevents overlay rounded'>
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
                                value={this.props.newevent.inputText}>
                            </input>
                        </div>
                        <div className='row-items'>
                            <DayDropdown
                                changeDay={this.changeDay}
                                dayOfWeek={this.props.newevent.dayOfWeek}>
                            </DayDropdown>
                            <div className='time-items'>
                                <HourDropdown
                                    changeHour={this.changeHour}
                                    isAM={this.props.newevent.newHour < 12}
                                    newHour={this.props.newevent.newHour}
                                    useMilitary={this.props.useMilitary}>
                                </HourDropdown>
                                <MinDropdown
                                    isZero={this.props.newevent.isZero}
                                    changeMin={this.changeMin}>
                                </MinDropdown>
                                <ToggleAM
                                    changeAM={this.changeAM}
                                    isAM={this.props.newevent.newHour < 12}
                                    useMilitary={this.props.useMilitary}>
                                </ToggleAM>
                            </div>
                        </div>
                        <div className='time-items'>
                            <HourDropdown
                                changeHour={this.changeHour2}
                                isAM={this.props.newevent.newHour2 < 12}
                                newHour={this.props.newevent.newHour2}
                                useMilitary={this.props.useMilitary}>
                            </HourDropdown>
                            <MinDropdown
                                isZero={this.props.newevent.isZero2}
                                changeMin={this.changeMin2}>
                            </MinDropdown>
                            <ToggleAM
                                changeAM={this.changeAM2}
                                isAM={this.props.newevent.newHour2 < 12}
                                useMilitary={this.props.useMilitary}>
                            </ToggleAM>
                        </div>
                        <button
                            className='contrast-light thin-button'
                            onClick={this.addToList}>
                            Add Event
                        </button>
                    </div>
                }
            </>
        );
    }

}

export default AddEventDialog;