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

    toggleOpen() {
        this.setState({
            open: !this.state.open
        });
    }

    setDay = (day) => {
        this.props.changeDay(day);
        this.toggleOpen();
    }

    render() {
        return (
            <div className='drop-container'>
                <button className='drop-open top-level' onClick={this.toggleOpen.bind(this)}> {this.props.dayOfWeek} </button>
                {
                    this.state.open ? (
                        <ul className='dropdown'>
                            {WeekDays.map(
                                (day) => (day === this.props.dayOfWeek ? null :
                                    <button
                                        key={day}
                                        className='drop-open'
                                        onClick={() => this.setDay(day)}>
                                        {day}
                                    </button>)
                            )}
                        </ul>
                    ) : null
                }
            </div>
        )
    }
}

export default DayDropdown;