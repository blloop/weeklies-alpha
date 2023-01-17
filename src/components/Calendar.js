import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';

class Calendar extends Component {

    constructor(props) {
        let jsonEvents = localStorage.getItem('weeklies-events');
        super(props);
        this.state = {
            events: (jsonEvents ? JSON.parse(jsonEvents) : []),
            useMilitary: false
        };
    }

    // Add an event to calendar
    addEvent = (item) => {
        if (item.title === '') {
            alert('Event title cannot be empty!');
            return;
        }
        if (this.state.events.some(
            curr =>
                curr.title === item.title &&
                curr.day === item.day &&
                curr.time === item.time
        )) {
            alert("Cannot add duplicate event!");
            return;
        }
        let newList = this.state.events
        newList.push(item)
        let newState = {
            ...this.state,
            Events: newList
        }
        this.setState(newState);
        localStorage.setItem('weeklies-events', JSON.stringify(this.state.events));
    };

    // Remove all events from calendar
    clearEvents = () => {
        localStorage.removeItem('weeklies-events');
        let newState = {
            ...this.state,
            events: []
        }
        this.setState(newState);
    }

    // Toggle 24 hour time setting
    toggleMilitary = () => {
        let newState = {
            ...this.state,
            useMilitary: !this.state.useMilitary
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className='calendar'>
                <NavBar
                    eventAdd={this.addEvent}
                    eventClear={this.clearEvents}
                    useMilitary={this.state.useMilitary}
                    toggleMilitary={this.toggleMilitary}>
                </NavBar>
                <EventList
                    allEvents={this.state.events}
                    useMilitary={this.state.useMilitary}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;