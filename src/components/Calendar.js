import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';

class Calendar extends Component {

    constructor(props) {
        let jsonEvents = localStorage.getItem('weeklies-events');
        super(props);
        this.state = {
            Events: (jsonEvents ? JSON.parse(jsonEvents) : [])
        };
    }

    addEvent = (item) => {
        if (item.title === '') {
            alert('Event title cannot be empty!');
            return;
        }
        if (this.state.Events.some(
            curr =>
                curr.title === item.title &&
                curr.day === item.day &&
                curr.time === item.time
        )) {
            alert("Cannot add duplicate event!");
            return;
        }
        let newList = this.state.Events
        newList.push(item)
        let newState = {
            Events: newList
        }
        this.setState(newState);
        localStorage.setItem('weeklies-events', JSON.stringify(this.state.Events));
    };

    clearEvents() {
        localStorage.removeItem('weeklies-events');
        let newState = {
            Events: []
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className='calendar'>
                <NavBar
                    eventAdd={this.addEvent.bind(this)}
                    eventClear={this.clearEvents.bind(this)}>
                </NavBar>
                <hr></hr>
                <EventList
                    allEvents={this.state.Events}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;