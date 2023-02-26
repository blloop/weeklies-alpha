import React, { Component } from 'react';
import { colorNames, dayList } from './Data';
import { lightColors, darkColors } from './Data';
import NavBar from './NavBar';
import Modal from './Modal';
import EventList from './EventList';
import AddEventDialog from './AddEventDialog';
import SettingsDialog from './SettingsDialog';

class Calendar extends Component {

    constructor(props) {
        // Import weeklies data from browser storage
        let inList = localStorage.getItem('weeklies');
        let inInfo = localStorage.getItem('weeklies-info');
        super(props);
        this.state = {
            events: (inList ?
                JSON.parse(inList) :
                []
            ),
            upcoming: {
                title: '',
                day: 0,
                start: 0,
                end: 0
            },
            oldid: 0,
            dialog: null,
            accent: (inInfo ?
                JSON.parse(inInfo)['accent'] :
                'orange'
            ),
            format: (inInfo ?
                JSON.parse(inInfo)['format'] :
                false
            ),
        };
    }

    // Update UI accent color upon page load
    componentDidMount() {
        this.setAccent(
            colorNames.indexOf(
                this.state.accent
            )
        );
    }

    // Add event to calendar
    // Checks for valid argument and
    // searches for overlaps before adding
    addEvent = (event) => {
        if (this.parseEvent(event, this.state.events)) {
            newList.push(this.parseEvent(event));
            newList.sort((a, b) => a.id - b.id);
            this.updateEvents(newList);
        };
    }

    // Edit event in calendar
    // Searches for old event by ID and
    // overwrites with new event data
    editEvent = (id, event) => {
        let newList = this.state.events.filter(
            event => event.id !== id
        );
        if (this.parseEvent(event, newList)) {
            let oldIndex = newList.findIndex(
                curr => curr.id === id
            );
            newList[oldIndex] = this.parseEvent(event);
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

    // Helper function that verifies an
    // event can be added to the calendar
    parseEvent = (event, list) => {
        if (event.title.length === 0) {
            alert('Event title cannot be empty!');
            return false;
        };
        if (event.start >= event.end) {
            alert("Invalid event duration!");
            return false;
        };
        if (list.some(
            curr =>
            ((curr.day === event.day) &&
                (curr.start == event.start ||
                    curr.end == event.end) ||
                (curr.start < event.end &&
                    curr.end > event.start) ||
                (curr.end > event.start &&
                    curr.start < event.end))
        )) {
            alert("Event overlaps with a current event!");
            return false;
        };
        return true;
    }

    // Helper function that updates events
    // and saves to local browser storage
    updateEvents = (list) => {
        let newState = {
            ...this.state,
            events: list,
            openDialog: null
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(list)
        );
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
            accentColor: colorNames[index]
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accentColor: newState.accentColor,
                useMilitary: newState.useMilitary
            })
        );
    }

    // Toggle military time usage (24 hour time)
    toggleMilitary = () => {
        let newState = {
            ...this.state,
            useMilitary: !this.state.useMilitary
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accentColor: newState.accentColor,
                useMilitary: newState.useMilitary
            })
        );
    }

    render() {
        return (
            <div className='calendar'>
                <NavBar
                    setDialog={this.setDialog}>
                </NavBar>
                <Modal
                    zIndex={12}
                    setDialog={this.setDialog}
                    isOpen={this.state.openDialog !== null}>
                </Modal>
                <AddEventDialog
                    addEvent={this.addEvent}
                    tempEvent={this.state.upcoming}
                    isOpen={this.state.openDialog === 'add'}
                    setDialog={this.setDialog}
                    useMilitary={this.state.useMilitary}>
                </AddEventDialog>
                <SettingsDialog
                    clearEvents={this.clearEvents}
                    isOpen={this.state.openDialog === 'settings'}
                    setDialog={this.setDialog}
                    accentColor={this.state.accentColor}
                    changeColor={this.setAccent}
                    useMilitary={this.state.useMilitary}
                    toggleMilitary={this.toggleMilitary}>
                </SettingsDialog>
                <EventList
                    allEvents={this.state.events}
                    editEvent={this.editEvent}
                    deleteEvent={this.deleteEvent}
                    isOpen={this.state.openDialog === 'edit'}
                    setDialog={this.setDialog}
                    useMilitary={this.state.useMilitary}>
                </EventList>
            </div>
        );
    }
}

export default Calendar;