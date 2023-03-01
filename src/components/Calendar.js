import React, { Component } from 'react';
import { colorNames, dayList } from './Data';
import { lightColors, darkColors } from './Data';
import NavBar from './NavBar';
import EventDialog from './EventDialog';
import SettingsDialog from './SettingsDialog';
import EventList from './EventList';

class Calendar extends Component {

    constructor(props) {
        // Import weeklies data from browser storage
        let getList = localStorage.getItem('weeklies');
        let getInfo = localStorage.getItem('weeklies-info');
        super(props);
        this.state = {
            events: (getList ?
                JSON.parse(getList) : []
            ),
            accent: (getInfo ?
                JSON.parse(getInfo)['accent'] : 'orange'
            ),
            format: (getInfo ?
                JSON.parse(getInfo)['format'] : false
            ),
            upcoming: {
                title: '',
                day: 'Sunday',
                start: 0,
                end: 0
            },
            oldid: 0,
            dialog: null,
            monoDay: 0
        };
    }

    // Update UI accent color upon page load
    componentDidMount() {
        this.setAccent(
            colorNames.indexOf(this.state.accent)
        );
    }

    // Calculates event ID based on start time
    // Returns the event with ID
    addID = (event) => {
        return {
            ...event,
            end: event.end === 0 ? 48 : event.end,
            id: (dayList.indexOf(event.day) * 48) +
                event.start
        };
    }

    // Add upcoming event to calendar
    // Checks for valid argument and checks for overlap
    addEvent = () => {
        let newList = this.state.events;
        if (this.parseEvent(
            this.state.upcoming, this.state.events
        )) {
            newList.push(this.addID(this.state.upcoming));
            newList.sort((a, b) => a.id - b.id);
            this.updateEvents(newList);
        };
    }

    // Edit event in calendar
    // Removes old event and adds in new one
    editEvent = () => {
        let newList = this.state.events.filter(
            event => event.id !== this.state.oldid
        );
        if (this.parseEvent(
            this.state.upcoming, newList
        )) {
            newList.push(this.addID(this.state.upcoming));
            newList.sort((a, b) => a.id - b.id);
            this.updateEvents(newList);
        };
    }

    // Remove event from calendar
    // Filters event list by ID
    deleteEvent = (id) => {
        let newList = this.state.events.filter(
            event => event.id !== id
        );
        this.updateEvents(newList);
    }

    // Remove all events from calendar
    clearEvents = () => {
        this.updateEvents([]);
    }

    // Helper method that verifies an
    // event can be added to the calendar
    parseEvent = (event, list) => {
        if (!event.title || event.title.length === 0) {
            alert('Event title cannot be empty!');
            return false;
        };
        if ((event.start > event.end && event.end !== 0) ||
            event.start === event.end) {
            alert("Invalid event duration!");
            return false;
        };
        if (list.some(
            curr =>
            ((curr.day === event.day) &&
                ((curr.start === event.start ||
                    curr.end === event.end) ||
                    (curr.start < event.end &&
                        curr.end > event.start) ||
                    (curr.end > event.start &&
                        curr.start < event.end)))
        )) {
            alert("Event overlaps with a current event!");
            return false;
        };
        return true;
    }

    // Helper method that updates events
    // and saves to local browser storage
    updateEvents = (list) => {
        let newState = {
            ...this.state,
            events: list,
            dialog: null
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(list)
        );
    }

    // Imports event selection data
    // into the edit event dialog
    editUpcoming = (id) => {
        let index = this.state.events.findIndex(
            event => event.id === id
        );
        let newState = {
            ...this.state,
            oldid: id,
            upcoming: {
                title: this.state.events[index].title,
                day: this.state.events[index].day,
                start: this.state.events[index].start,
                end: this.state.events[index].end
            },
            dialog: 'edit'
        };
        this.setState(newState);
    }

    // Sets selected time slot to be displayed
    // in the add event dialog
    addUpcoming = (day, time) => {
        let newState = {
            ...this.state,
            upcoming: {
                title: '',
                day: day,
                start: time,
                end: (time + 2) % 48
            },
            dialog: 'add'
        };
        this.setState(newState);
    }

    // Updates the upcoming event details
    // for the add and edit event dialogs
    changeUpcoming = (event) => {
        let newState = {
            ...this.state,
            upcoming: event
        };
        this.setState(newState);
    }

    // Changes the open dialog by name
    // Can be passed null as a valid value
    setDialog = (name) => {
        let newState = {
            ...this.state,
            dialog: name
        };
        this.setState(newState);
    }

    // Updates the selected day in a mono-view
    // for smaller screens
    setMono = (num) => {
        let newState = {
            ...this.state,
            monoDay: num
        };
        this.setState(newState);
    }

    // Set accent color
    setAccent = (index) => {
        document.body.style.setProperty(
            '--light-accent', lightColors[index]
        );
        document.body.style.setProperty(
            '--dark-accent', darkColors[index]
        );
        let newState = {
            ...this.state,
            accent: colorNames[index]
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accent: newState.accent,
                format: newState.format
            })
        );
    }

    // Toggle military time usage (24 hour time)
    toggleFormat = () => {
        let newState = {
            ...this.state,
            format: !this.state.format
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accent: newState.accent,
                format: newState.format
            })
        );
    }

    render() {
        console.log(this.state.upcoming)
        return (
            <div className='calendar'>
                <NavBar
                    setDialog={this.setDialog}>
                </NavBar>
                <EventDialog
                    type={'add'}
                    addEvent={this.addEvent}
                    tempEvent={this.state.upcoming}
                    changeUpcoming={this.changeUpcoming}
                    isOpen={this.state.dialog === 'add'}
                    setDialog={this.setDialog}
                    format={this.state.format}>
                </EventDialog>
                <EventDialog
                    type={'edit'}
                    addEvent={this.addEvent}
                    editEvent={this.editEvent}
                    deleteEvent={this.deleteEvent}
                    tempEvent={this.state.upcoming}
                    changeUpcoming={this.changeUpcoming}
                    isOpen={this.state.dialog === 'edit'}
                    setDialog={this.setDialog}
                    format={this.state.format}>
                </EventDialog>
                <SettingsDialog
                    clearEvents={this.clearEvents}
                    isOpen={this.state.dialog === 'settings'}
                    setDialog={this.setDialog}
                    accentColor={this.state.accentColor}
                    changeColor={this.setAccent}
                    format={this.state.format}
                    toggleFormat={this.toggleFormat}>
                </SettingsDialog>
                <EventList
                    allEvents={this.state.events}
                    addUpcoming={this.addUpcoming}
                    editUpcoming={this.editUpcoming}
                    monoDay={this.state.monoDay}
                    setMono={this.setMono}
                    setDialog={this.setDialog}
                    format={this.state.format}>
                </EventList>
            </div>
        );
    }
}

export default Calendar;