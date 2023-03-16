import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { colorNames, dayList } from './Data';
import { lightColors, darkColors } from './Data';
import NavBar from './NavBar';
import EventList from './EventList';
import EventDialog from './EventDialog';
import SettingsDialog from './SettingsDialog';
import WarningDialog from './WarningDialog';

const Calendar = () => {
    // Loads events and settings from browser storage
    let getList = localStorage.getItem('weeklies');
    let getInfo = localStorage.getItem('weeklies-info');
    const [events, setEvents] = useState(getList ?
        JSON.parse(getList) : []
    );
    const [accent, setAccent] = useState(getInfo ?
        JSON.parse(getInfo)['accent'] : 'orange'
    );
    const [format, setFormat] = useState(getInfo ?
        JSON.parse(getInfo)['format'] : false
    );
    const [start, setStart] = useState(0)
    const [upcoming, setUpcoming] = useState({
        title: '',
        day: 'Sunday',
        start: 0,
        end: 0
    });
    const [oldid, setOldid] = useState(0);
    const [dialog, setDialog] = useState('');
    const [warning, setWarning] = useState('');
    const [mono, setMono] = useState(0);

    // Calculates event ID based on start time
    // Returns the event with ID added
    const addID = (event) => ({
        ...event,
        end: event.end === 0 ? 48 : event.end,
        id: (dayList.indexOf(event.day) * 48) +
            event.start
    });

    // Add upcoming event to calendar
    const addEvent = () => {
        let newList = events;
        if (parseEvent(upcoming, events)) {
            newList.push(addID(upcoming));
            newList.sort((a, b) => a.id - b.id);
            updateEvents(newList);
        }
    };

    // Edit existing event in calendar
    // Removes old event and adds in new one
    const editEvent = () => {
        let newList = events.filter(
            event => event.id !== oldid
        );
        if (parseEvent(upcoming, newList)) {
            newList.push(addID(upcoming));
            newList.sort((a, b) => a.id - b.id);
            updateEvents(newList);
        }
    };

    // Remove event from calendar
    // Uses local id saved of last event clicked
    const deleteEvent = () => {
        let newList = events.filter(
            event => event.id !== oldid
        );
        updateEvents(newList);
    };

    // Helper method that verifies an event can be added
    // Validates arguments and checks for overlaps
    const parseEvent = (event, list) => {
        if (!event.title || event.title.length === 0) {
            setWarning('Event title cannot be empty!');
            return false;
        };
        if ((event.start > event.end && 
            event.end !== 0) ||
            event.start === event.end) {
            setWarning('Invalid event duration!');
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
            setWarning(
                'Time overlaps with another event!'
            );
            return false;
        };
        return true;
    };

    // Helper method that updates events
    // Saves new list of events to browser storage
    const updateEvents = (list) => {
        setEvents(list);
        setDialog('');
        localStorage.setItem(
            'weeklies',
            JSON.stringify(list)
        );
    };

    // Imports event data for edit event dialog
    const editUpcoming = (id) => {
        let index = events.findIndex(
            event => event.id === id
        );
        setOldid(id);
        setUpcoming({
            title: events[index].title,
            day: events[index].day,
            start: events[index].start,
            end: events[index].end
        });
        setDialog('edit');
    };

    // Imports time data for add event dialog
    const addUpcoming = (day, time) => {
        setUpcoming({
            title: '',
            day: day,
            start: time,
            end: (time + 2) % 48
        });
        setDialog('add');
    };

    // Changes accent color and updates UI
    const changeAccent = useCallback((index) => {
        document.body.style.setProperty(
            '--light-accent', lightColors[index]
        );
        document.body.style.setProperty(
            '--dark-accent', darkColors[index]
        );
        setAccent(colorNames[index]);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accent: colorNames[index],
                format: format,
                start: start
            })
        );
    }, [format, start]);

    // Toggles time format used
    const changeFormat = () => {
        setFormat(!format);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accent: accent,
                format: !format,
                start: start
            })
        );
    };

    // Changes daily start time
    const changeStart = (num) => {
        setStart(num);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                accent: accent,
                format: format,
                start: num
            })
        );
    }

    useEffect(() => {changeAccent(
            colorNames.indexOf(accent)
        )}, [accent, changeAccent]
    );

    return (
        <div className='calendar'>
            <NavBar
                setDialog={setDialog}/>
            <EventDialog
                type={'add'}
                addEvent={addEvent}
                tempEvent={upcoming}
                setUpcoming={setUpcoming}
                isOpen={dialog === 'add'}
                setDialog={setDialog}
                format={format}/>
            <EventDialog
                type={'edit'}
                addEvent={addEvent}
                editEvent={editEvent}
                deleteEvent={deleteEvent}
                tempEvent={upcoming}
                setUpcoming={setUpcoming}
                isOpen={dialog === 'edit'}
                setDialog={setDialog}
                format={format}/>
            <SettingsDialog
                clearEvents={() => {updateEvents([]);}}
                isOpen={dialog === 'settings'}
                setDialog={setDialog}
                accentColor={accent}
                changeColor={changeAccent}
                format={format}
                toggleFormat={changeFormat}/>
            <WarningDialog
                text={warning}
                setWarning={setWarning}/>
            <EventList
                allEvents={events}
                addUpcoming={addUpcoming}
                editUpcoming={editUpcoming}
                monoDay={mono}
                start={start}
                changeStart={changeStart}
                setMono={setMono}
                setDialog={setDialog}
                format={format}/>
        </div>
    );
};

export default Calendar;