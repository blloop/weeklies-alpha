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

    // Add an event to calendar
    addEvent = (item) => {
        if (item.title === '') {
            alert('Event title cannot be empty!');
            return -1;
        }
        if (this.state.events.some(
            curr =>
            ((curr.day === item.day) &&
                ((curr.hour === item.hour ||
                    curr.hour2 === item.hour2) ||
                    ((curr.hour + (curr.min ? 0 : 0.5) <
                        item.hour2 + (item.min2 ? 0 : 0.5) &&
                        curr.hour2 + (curr.min2 ? 0 : 0.5) >
                        item.hour + (item.min ? 0 : 0.5)) ||
                        (curr.hour2 + (curr.min2 ? 0 : 0.5) >
                            item.hour + (item.min ? 0 : 0.5) &&
                            curr.hour + (curr.min ? 0 : 0.5) <
                            item.hour + (item.min ? 0 : 0.5))
                    )))
        )) {
            alert("Event overlaps with a current event!");
            return -1;
        }
        if (item.hour2 < item.hour ||
            (item.hour === item.hour2 && item.min >= item.min2)) {
            alert("Event must occur for at least 30 min!");
            return -1;
        }
        let newList = this.state.events;
        newList.push(item);
        newList.sort(eventCompare);
        let newState = {
            ...this.state,
            Events: newList
        }
        this.setState(newState);
        localStorage.setItem(
            'weeklies',
            JSON.stringify(newState)
        );
        return 0;
    }

    editEvent = (oldEvent, newEvent) => {
        // let country = data.find(el => el.code === "AL");
        console.log(this.state.events);

        let currEvent = {
            title: newEvent.inputText,
            day: newEvent.dayOfWeek,
            hour: newEvent.newHour,
            min: (newEvent.isZero ? 0 : 30),
            hour2: newEvent.newHour2,
            min2: (newEvent.isZero2 ? 0 : 30)
        };

        if (this.addEvent(currEvent) < 0) {
            return;
        }

        console.log('OIOIO');
        let newList = this.state.events;
        newList.filter(
            (event) => {
                return (
                    event.title === oldEvent.inputText &&
                    event.day === oldEvent.dayOfWeek &&
                    event.hour === oldEvent.newHour
                );
            }
        )
        let newState = {
            ...this.state,
            Events: newList
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