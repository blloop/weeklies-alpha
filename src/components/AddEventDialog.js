import React, { Component } from 'react';
import DayDropdown from './DayDropdown';
import HourDropdown from './HourDropdown';
import MinDropdown from './MinDropdown';
import ToggleAM from './ToggleAM';

class AddEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog,
            inputText: '',
            dayOfWeek: 'Sunday',
            newHour: 0,
            isZero: true,
            newHour2: 0,
            isZero2: true
        }
    }

    // Add an event to dialog
    // Sends request to top level component
    addToList = () => {
        let newEvent = {
            title: this.state.inputText,
            day: this.state.dayOfWeek,
            hour: this.state.newHour,
            min: (this.state.isZero ? 0 : 30),
            hour2: this.state.newHour2,
            min2: (this.state.isZero2 ? 0 : 30)
        };
        this.props.eventAdd(newEvent);
    }

    // Updates value of text field
    // and stores as part of state
    updateText = (event) => {
        let newState = {
            ...this.state,
            inputText: event.target.value
        }
        this.setState(newState);
    };

    // Set current value for day of the week
    changeDay = (day) => {
        let newState = {
            ...this.state,
            dayOfWeek: day
        }
        this.setState(newState);
    }

    // Sets current hour of event
    changeHour = (hour) => {
        let newState = {
            ...this.state,
            newHour: hour
        }
        this.setState(newState);
    }

    // Sets current minute of event
    // Intervals of 0:30, represented by bool
    changeMin = () => {
        let newState = {
            ...this.state,
            isZero: !this.state.isZero
        }
        this.setState(newState);
    }

    // Sets current state of the hour AM/PM
    // Only valid if 24 hour time is not in use
    changeAM = () => {
        let newState = {
            ...this.state,
            newHour: (this.state.newHour < 12 ?
                this.state.newHour + 12 :
                this.state.newHour - 12
            )
        }
        this.setState(newState);
    }


    // Sets current hour of event #2
    changeHour2 = (hour) => {
        let newState = {
            ...this.state,
            newHour2: hour
        }
        this.setState(newState);
    }

    // Sets current minute of event #2
    // Intervals of 0:30, represented by bool
    changeMin2 = () => {
        let newState = {
            ...this.state,
            isZero2: !this.state.isZero2
        }
        this.setState(newState);
    }

    // Sets current state of the hour AM/PM #2
    // Only valid if 24 hour time is not in use
    changeAM2 = () => {
        let newState = {
            ...this.state,
            newHour2: (this.state.newHour2 < 12 ?
                this.state.newHour2 + 12 :
                this.state.newHour2 - 12
            )
        }
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
                                value={this.state.inputText}>
                            </input>
                        </div>
                        <div className='row-items'>
                            <DayDropdown
                                changeDay={this.changeDay}
                                dayOfWeek={this.state.dayOfWeek}>
                            </DayDropdown>
                            <div className='time-items'>
                                <HourDropdown
                                    changeHour={this.changeHour}
                                    isAM={this.state.newHour < 12}
                                    newHour={this.state.newHour}
                                    useMilitary={this.props.useMilitary}>
                                </HourDropdown>
                                <MinDropdown
                                    isZero={this.state.isZero}
                                    changeMin={this.changeMin}>
                                </MinDropdown>
                                <ToggleAM
                                    changeAM={this.changeAM}
                                    isAM={this.state.newHour < 12}
                                    useMilitary={this.props.useMilitary}>
                                </ToggleAM>
                            </div>
                        </div>
                        <div className='time-items'>
                            <HourDropdown
                                changeHour={this.changeHour2}
                                isAM={this.state.newHour2 < 12}
                                newHour={this.state.newHour2}
                                useMilitary={this.props.useMilitary}>
                            </HourDropdown>
                            <MinDropdown
                                isZero={this.state.isZero2}
                                changeMin={this.changeMin2}>
                            </MinDropdown>
                            <ToggleAM
                                changeAM={this.changeAM2}
                                isAM={this.state.newHour2 < 12}
                                useMilitary={this.props.useMilitary}>
                            </ToggleAM>
                        </div>
                        <button
                            className='contrast thin-button'
                            onClick={this.addToList}>
                            Add Event
                        </button>
                    </div>
                }
            </>
        )
    }

}

export default AddEventDialog;