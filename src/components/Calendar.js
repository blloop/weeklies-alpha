import React, { Component } from 'react';
import NavBar from './NavBar';
import Modal from './Modal';
import EventList from './EventList';
import AddEventDialog from './AddEventDialog';
import SettingsDialog from './SettingsDialog';
import { colorNames, lightColors, darkColors, dayList } from './Data';

class Calendar extends Component {

    constructor(props) {
        // Import weeklies data from browser storage
        let jsonInfo = localStorage.getItem('weeklies');
        super(props);
        this.state = {
            events: (jsonInfo ?
                JSON.parse(jsonInfo)['events'] :
                []
            ),
            useMilitary: (jsonInfo ?
                JSON.parse(jsonInfo)['useMilitary'] :
                false
            ),
            accentColor: (jsonInfo ?
                JSON.parse(jsonInfo)['accentColor'] :
                'orange'
            ),
            newEvent: {
                dayOfWeek: 'Sunday',
                newHour: 0,
                isZero: true,
                newHour2: 0,
                isZero2: true
            },
            openDialog: null,
            warningDialog: false
        };
    }

    // Update UI accent color upon page load
    componentDidMount() {
        this.changeColor(
            colorNames.indexOf(this.props.newevent.accentColor)
        );
    }

    // Helper function to add event to list
    addHelper = (list, event) => {
        if (event.title.length === 0) {
            alert('Event title cannot be empty!');
            return -1;
        };
        if (event.hour2 < event.hour ||
            (event.hour === event.hour2 &&
                event.min >= event.min2)) {
            alert("Event must occur for at least 30 min!");
            return -1;
        };
        if (list.some(
            curr =>
            ((curr.day === event.day) &&
                ((
                    (curr.hour === event.hour &&
                        curr.min === event.min) ||
                    (curr.hour2 === event.hour2 &&
                        curr.min2 === event.min2)
                ) ||
                    ((curr.hour + (curr.min ? 0 : 0.5) <
                        event.hour2 + (event.min2 ? 0 : 0.5) &&
                        curr.hour2 + (curr.min2 ? 0 : 0.5) >
                        event.hour + (event.min ? 0 : 0.5)) ||
                        (curr.hour2 + (curr.min2 ? 0 : 0.5) >
                            event.hour + (event.min ? 0 : 0.5) &&
                            curr.hour + (curr.min ? 0 : 0.5) <
                            event.hour + (event.min ? 0 : 0.5)))
                ))
        )) {
            alert("Event overlaps with a current event!");
            return -1;
        };
        list.push(event);
        list.sort((a, b) => a.id - b.id);
        return 0;
    }

    // Add an event to calendar
    addEvent = (event) => {
        let newList = this.state.events;
        if (this.addHelper(newList, event) < 0) {
            return;
        };
        let newState = {
            ...this.state,
            events: newList,
            openDialog: null
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Edit given event in calendar
    // Removes old event and attempts to add new one
    // If cannot add, no changes are saved
    editEvent = (oldID, newEvent) => {
        // Filter out old by ID
        let newList = this.state.events;
        newList = newList.filter(
            event => event.id !== oldID
        );

        // Format new event to add
        let eventID =
            (dayList.indexOf(newEvent.dayOfWeek) * 48) +
            newEvent.newHour * 2 +
            (newEvent.isZero ? 0 : 1);
        let currEvent = {
            id: eventID,
            title: newEvent.inputText,
            day: newEvent.dayOfWeek,
            hour: newEvent.newHour,
            min: (newEvent.isZero ? 0 : 30),
            hour2: newEvent.newHour2,
            min2: (newEvent.isZero2 ? 0 : 30)
        };

        // Attempt to add event and exit if it fails
        if (this.addHelper(newList, currEvent) < 0) {
            return;
        };

        // Update state with new event change
        let newState = {
            ...this.state,
            events: newList
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Remove given event from calendar
    deleteEvent = (eventID) => {
        // Filter out event by ID
        let newList = this.state.events;
        newList = newList.filter(
            event => event.id !== eventID
        );

        // Update state with new event change
        let newState = {
            ...this.state,
            events: newList
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Remove all events from calendar
    clearEvents = () => {
        let newState = {
            ...this.state,
            events: [],
            openDialog: null
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Sets default event info in add dialog
    setDefault = (info) => {
        let addDefault = {
            dayOfWeek: info.day,
            newHour: info.hour,
            isZero: info.min,
            newHour2: info.hour,
            isZero2: info.min
        }
        let newState = {
            ...this.props.newevent,
            newEvent: addDefault,
            openDialog: 'add',
        };
        this.setState(newState);
    }

    // Opens a dialog by name
    openModal = (name) => {
        let newState = {
            ...this.state,
            openDialog: name
        };
        this.setState(newState);
    }

    // Closes all open dialogs
    closeModal = () => {
        let newState = {
            ...this.state,
            openDialog: null
        };
        this.setState(newState);
    }


    // Toggle 24 hour time setting
    toggleMilitary = () => {
        let newState = {
            ...this.state,
            useMilitary: !this.state.useMilitary
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Change accent color
    changeColor = (num) => {
        document.body.style.setProperty(
            '--light-accent', lightColors[num]
        );
        document.body.style.setProperty(
            '--dark-accent', darkColors[num]
        );
        let newState = {
            ...this.state,
            accentColor: colorNames[num]
        };
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );

    }

    render() {
        return (
            <div className='calendar'>
                <NavBar
                    openModal={this.openModal}>
                </NavBar>
                <Modal
                    closeModal={this.closeModal}
                    openModal={this.state.openDialog !== null}>
                </Modal>
                <AddEventDialog
                    addEvent={this.addEvent}
                    closeModal={this.closeModal}
                    showDialog={this.state.openDialog === 'add'}
                    useMilitary={this.state.useMilitary}>
                </AddEventDialog>
                <SettingsDialog
                    clearEvents={this.clearEvents}
                    closeModal={this.closeModal}
                    showDialog={this.state.openDialog === 'settings'}
                    accentColor={this.state.accentColor}
                    changeColor={this.changeColor}
                    useMilitary={this.state.useMilitary}
                    toggleMilitary={this.toggleMilitary}>
                </SettingsDialog>
                <EventList
                    allEvents={this.state.events}
                    editEvent={this.editEvent}
                    deleteEvent={this.deleteEvent}
                    setDefault={this.setDefault}
                    openModal={this.openModal}
                    showDialog={this.state.openDialog === 'edit'}
                    useMilitary={this.state.useMilitary}>
                </EventList>
            </div>
        );
    }
}

export default Calendar;