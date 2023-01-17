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
            isZero: true
        }
    }

    // Add an event to dialog
    // Sends request to top level component
    addToList() {
        if (this.state.inputText !== '') {
            this.props.closeModal();
        }
        let newEvent = {
            title: this.state.inputText,
            day: this.state.dayOfWeek,
            hour: this.state.newHour,
            min: (this.state.isZero ? 0 : 30)
        };
        this.props.eventAdd(newEvent);
        let newState = {
            ...this.state,
            inputText: ''
        }
        this.setState(newState)
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
        console.log(this.state.newHour + ', ' +
            (this.state.isZero ? '00' : '30'));
    }

    // Sets current minute of event
    // Intervals of 0:30, represented by bool
    changeMin = () => {
        let newState = {
            ...this.state,
            isZero: !this.state.isZero
        }
        this.setState(newState);
        console.log(this.state.newHour + ', ' +
            (this.state.isZero ? '00' : '30'));
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
        console.log(this.state.newHour + ', ' +
            (this.state.isZero ? '00' : '30'));
    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='addevents overlay rounded'>
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
                        <button
                            className='contrast thin-button'
                            onClick={this.addToList.bind(this)}>
                            Add Event
                        </button>
                    </div>
                }
            </>
        )
    }

}

export default AddEventDialog;