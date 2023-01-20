import React, { Component } from 'react';

const WeekDays = [
    'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

class DayDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    // Toggles dropdown open state
    toggleOpen() {
        this.setState({
            open: !this.state.open
        });
    }

    // Sets dropdown value
    setDay = (day) => {
        this.props.changeDay(day);
        this.toggleOpen();
    }

    render() {
        return (
            <>
                <button
                    className='drop-box top-button square'
                    onClick={this.toggleOpen.bind(this)}>
                    {this.props.dayOfWeek}
                </button>
                {
                    this.state.open ? (
                        <ul className='dropdown'>
                            {WeekDays.map((day) =>
                                <button
                                    key={day}
                                    className='drop-box square'
                                    onClick={() => this.setDay(day)}>
                                    {day}
                                </button>
                            )}
                        </ul>
                    ) : null
                }
            </>
        )
    }
}

export default DayDropdown;