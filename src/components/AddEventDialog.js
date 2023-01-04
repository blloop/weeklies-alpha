import React, { Component } from 'react';
import DayDropdown from './DayDropdown';
import TimeDropdown from './TimeDropdown';

class AddEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog,
            inputText: '',
            dayOfWeek: 'Sunday',
            timeOfDay: 0,
            useMilitary: false
        }
    }

    addToList() {
        let newEvent = {
            title: this.state.inputText,
            day: this.state.dayOfWeek,
            time: this.state.timeOfDay
        };
        this.props.eventAdd(newEvent);
        let newState = {
            showDialog: this.state.showDialog,
            inputText: '',
            dayOfWeek: this.state.dayOfWeek,
            timeOfDay: this.state.timeOfDay,
            useMilitary: this.state.useMilitary
        }
        this.setState(newState)
    }

    updateText = (event) => {
        let newState = {
            showDialog: this.state.showDialog,
            inputText: event.target.value,
            dayOfWeek: this.state.dayOfWeek,
            timeOfDay: this.state.timeOfDay,
            useMilitary: this.state.useMilitary
        }
        this.setState(newState);
    };

    changeDay = (day) => {
        let newState = {
            showDialog: this.state.showDialog,
            inputText: this.state.inputText,
            dayOfWeek: day,
            timeOfDay: this.state.timeOfDay,
            useMilitary: this.state.useMilitary
        }
        this.setState(newState);

    }

    changeTime = (time) => {
        let newTime = (this.state.timeOfDay + time) % 48;
        let newState = {
            showDialog: this.state.showDialog,
            inputText: this.state.inputText,
            dayOfWeek: this.state.dayOfWeek,
            timeOfDay: (newTime !== -1 ? newTime : 47),
            useMilitary: this.state.useMilitary
        }
        this.setState(newState);
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
                            <TimeDropdown
                                useMilitary={this.state.useMilitary}
                                changeTime={this.changeTime}
                                timeOfDay={this.state.timeOfDay}>
                            </TimeDropdown>
                        </div>
                        <button
                            className='contrast add-button'
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