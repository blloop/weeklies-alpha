import React, { Component } from 'react';
import DayDropdown from './DayDropdown';

class AddEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog,
            inputText: '',
            dayOfWeek: 'Sunday',
        }
    }

    addToList() {
        let newEvent = {
            title: this.state.inputText,
            day: this.state.dayOfWeek
        };
        this.props.eventAdd(newEvent);
        let newState = {
            showDialog: this.state.showDialog,
            inputText: '',
            dayOfWeek: this.state.dayOfWeek
        }
        this.setState(newState)
    }

    updateText = (event) => {
        let newState = {
            showDialog: this.state.showDialog,
            inputText: event.target.value,
            dayOfWeek: this.state.dayOfWeek
        }
        this.setState(newState);
    };

    changeDay = (day) => {
        let newState = {
            showDialog: this.state.showDialog,
            inputText: this.state.inputText,
            dayOfWeek: day
        }
        this.setState(newState);

    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='addevents overlay rounded'>
                        <DayDropdown
                            changeDay={this.changeDay}
                            dayOfWeek={this.state.dayOfWeek}>
                        </DayDropdown>
                        <div className='text-container'>
                            <p> Name of Event: </p>
                            <input
                                onChange={this.updateText}
                                value={this.state.inputText}>
                            </input>
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