import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Events: []
        };
    }

    addEvent(item) {
        // Pseudocode: Check if list contains item by name already
        // if (this.state.Events.contains(item.title)) {

        // }
        let newList = this.state.Events
        newList.push(item)
        let newState = {
            Events: newList
        }
        this.setState(newState);
    };

    render() {
        return (
            <div className='calendar'>
                <NavBar
                    eventAdd={this.addEvent.bind(this)}>
                </NavBar>
                <hr></hr>
                <EventList
                    EventsList={this.state.Events}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;