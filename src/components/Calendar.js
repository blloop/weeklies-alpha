import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';

// Compare two events by hour, then minute
let eventCompare = (ev1, ev2) => {
    return (
        ev1.hour - ev2.hour === 0 ?
            ev1.min - ev2.min :
            ev1.hour - ev2.hour
    );
}

let colorNames = [
    'red',
    'green',
    'blue',
    'yellow'
];

let lightColors = [
    'rgb(255, 158, 158)',
    'rgb(157 241 140)',
    'rgb(167 188 255)',
    'rgb(241, 218, 100)'
];

let darkColors = [
    'rgb(255, 89, 89)',
    'rgb(97, 218, 73)',
    'rgb(103, 139, 255)',
    'rgb(223, 194, 50)'
];

class Calendar extends Component {

    constructor(props) {
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
                'red'
            )
        };
    }

    componentDidMount() {
        let checkColor = this.state.accentColor;
        this.changeColor(
            (checkColor === 'red' ?
                0 :
                checkColor === 'green' ?
                    1 :
                    checkColor === 'blue' ?
                        2 :
                        checkColor === 'yellow' ?
                            3 : 3
            )
        );
    }

    addHelper = (list, event) => {
        if (event.title === '') {
            alert('Event title cannot be empty!');
            return -1;
        }
        if (event.hour2 < event.hour ||
            (event.hour === event.hour2 &&
                event.min >= event.min2)) {
            alert("Event must occur for at least 30 min!");
            return -1;
        }
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
        }
        list.push(event);
        list.sort(eventCompare);
        return 0;
    }

    // Add an event to calendar
    addEvent = (event) => {
        let newList = this.state.events;
        if (this.addHelper(newList, event) < 0) {
            return;
        }
        let newState = {
            ...this.state,
            events: newList
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
        return 0;
    }

    editEvent = (oldEvent, newEvent) => {

        // console.log(oldEvent);
        // console.log(newEvent);
        // console.log(this.state.events);

        // Remove old event
        let newList = this.state.events;
        newList = newList.filter(
            event => event.id !== oldEvent.id
        );
        // for (let i = 0; i < newList.length; i++) {
        //     if (newList[i].day === oldEvent.day &&
        //         newList[i].hour === oldEvent.hour &&
        //         newList[i].min === oldEvent.min) {
        //         console.log('removing item!!!');
        //         console.log(newList[i]);
        //         newList.splice(i, 1);
        //     }
        // }

        // Attempt to add new event
        // let currEvent = {
        //     title: newEvent.inputText,
        //     day: newEvent.dayOfWeek,
        //     hour: newEvent.newHour,
        //     min: (newEvent.isZero ? 0 : 30),
        //     hour2: newEvent.newHour2,
        //     min2: (newEvent.isZero2 ? 0 : 30)
        // };
        // if (this.addHelper(newList, currEvent) < 0) {
        //     return;
        // }

        // Update state with new event change
        let newState = {
            ...this.state,
            events: newList
        }
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
            events: []
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
    }

    // Toggle 24 hour time setting
    toggleMilitary = () => {
        let newState = {
            ...this.state,
            useMilitary: !this.state.useMilitary
        }
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
        }
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
                    addEvent={this.addEvent}
                    eventClear={this.clearEvents}
                    useMilitary={this.state.useMilitary}
                    toggleMilitary={this.toggleMilitary}
                    accentColor={this.state.accentColor}
                    changeColor={this.changeColor}>
                </NavBar>
                <EventList
                    allEvents={this.state.events}
                    editEvent={this.editEvent}
                    useMilitary={this.state.useMilitary}>
                </EventList>
            </div>
        )
    }
}

export default Calendar;