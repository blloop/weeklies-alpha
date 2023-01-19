import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import TimeScale from './TimeScale';

let eventCompare = (ev1, ev2) => {
    return (
        ev1.hour - ev2.hour === 0 ?
            ev1.min - ev2.min :
            ev1.hour - ev2.hour
    );
}

class Calendar extends Component {

    constructor(props) {
        let jsonEvents = localStorage.getItem('weeklies-events');
        super(props);
        this.state = {
            events: (jsonEvents ? JSON.parse(jsonEvents) : []),
            useMilitary: false,
            accentColor: 'red'
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
        newList.push(item);
        newList.sort(eventCompare);
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

    // Change accent color
    changeColor = (color) => {
        document.body.style.setProperty(
            '--light-accent',
            (color === 'red') ?
                'rgb(255, 158, 158)' :
                ((color === 'blue') ?
                    'rgb(167 188 255)' :
                    ('rgb(157 241 140)')
                )
        );
        document.body.style.setProperty(
            '--dark-accent',
            (color === 'red') ?
                'rgb(255, 89, 89)' :
                ((color === 'blue') ?
                    'rgb(103, 139, 255)' :
                    ('rgb(97, 218, 73)')
                )
        );
        let newState = {
            ...this.state,
            accentColor: color
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
                    toggleMilitary={this.toggleMilitary}
                    accentColor={this.state.accentColor}
                    changeColor={this.changeColor}>
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