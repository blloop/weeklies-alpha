import React, { useState } from 'react';
import { dayList } from './Data';
import NavBar from './NavBar';
import EventList from './EventList';
import EventDialog from './EventDialog';
import SettingsDialog from './SettingsDialog';
import WarningDialog from './WarningDialog';
import InfoDialog from './InfoDialog';

const Calendar = () => {
    // Loads events and settings from browser storage
    let getList = localStorage.getItem('weeklies');
    let getInfo = localStorage.getItem('weeklies-info');
    const [events, setEvents] = useState(getList ?
        JSON.parse(getList) : []
    );
    const [format, setFormat] = useState(getInfo ?
        JSON.parse(getInfo)['format'] : false
    );
    const [start, setStart] = useState(getInfo ?
        JSON.parse(getInfo)['start'] : 12
    );
    const [end, setEnd] = useState(getInfo ?
        JSON.parse(getInfo)['end'] : 48)
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

    // Toggles time format used
    const changeFormat = () => {
        setFormat(!format);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                format: !format,
                start: start,
                end: end
            })
        );
    };

    // Changes daily start time
    const changeStart = (num) => {
        setStart(num);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                format: format,
                start: num, 
                end: end
            })
        );
    }

    // Changes daily end time
    const changeEnd = (num) => {
        setEnd(num);
        localStorage.setItem(
            'weeklies-info',
            JSON.stringify({
                format: format,
                start: start,
                end: num
            })
        );
        console.log("change end to " + end);
    }

    return (
        <div className='calendar'>
            <NavBar
                setDialog={setDialog}/>
            <EventDialog
                type={dialog}
                addEvent={addEvent}
                editEvent={editEvent}
                deleteEvent={deleteEvent}
                tempEvent={upcoming}
                setUpcoming={setUpcoming}
                isOpen={
                    dialog === 'edit' ||
                    dialog === 'add'
                }
                setDialog={setDialog}
                format={format}/>
            <SettingsDialog
                clearEvents={() => {updateEvents([]);}}
                isOpen={dialog === 'settings'}
                setDialog={setDialog}
                format={format}
                toggleFormat={changeFormat}/>
            <WarningDialog
                text={warning}
                setWarning={setWarning}/>
            <InfoDialog
                isOpen={dialog === 'info'}
                setDialog={setDialog}/>
            <EventList
                allEvents={events}
                addUpcoming={addUpcoming}
                editUpcoming={editUpcoming}
                monoDay={mono}
                start={start}
                changeStart={changeStart}
                end={end}
                changeEnd={changeEnd}
                setMono={setMono}
                setDialog={setDialog}
                format={format}/>
        </div>
    );
};

export default Calendar;