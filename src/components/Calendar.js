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

    addToEvents(item) {
        let newList = this.state.Events
        newList.push(item)
        let newState = {
            Events: newList
        }
        this.setState(newState);
    };

    resetEvents() {
        let newState = {
            Events: []
        }
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <NavBar
                    EventAdd={this.addToEvents.bind(this)}
                    EventClear={this.resetEvents.bind(this)}>
                </NavBar>
                <EventList
                    EventsList={this.state.Events}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;