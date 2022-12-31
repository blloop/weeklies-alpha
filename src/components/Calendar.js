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
        let newList = this.state.Events
        newList.push(item)
        let newState = {
            Events: newList
        }
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <NavBar
                    eventAdd={this.addEvent.bind(this)}>
                </NavBar>
                <EventList
                    EventsList={this.state.Events}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;