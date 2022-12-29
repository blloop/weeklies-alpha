import React, { Component } from 'react';

class EventList extends Component {
    state = {
        Events: [],
        NumEvents: 0
    };

    addEvent() {
        let newState = {
            Events: [],
            NumEvents: this.state.NumEvents + 1
        }
        this.setState(newState);
    };

    render() {
        let OutEvents = [];
        for (let i = 0; i < this.state.NumEvents; i++) {
            OutEvents.push(<div key={i}><p>Event Number {i}</p></div>)
        }

        return (
            <div>
                <button onClick={this.addEvent.bind(this)}> Add Event </button>
                {OutEvents}
            </div>
        )
    }
}

export default EventList;