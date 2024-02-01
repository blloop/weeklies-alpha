import React, { useState } from 'react';
import { lightColors, darkColors, dayList } from './Data';
import NavBar from './NavBar';
import EventList from './EventList';
import EventDialog from './EventDialog';
import SettingsDialog from './SettingsDialog';
import WarningDialog from './WarningDialog';
import InfoDialog from './InfoDialog';

const VER_NUM = 'weeklies_1.3.1';

const Calendar = () => {
    // Loads events and settings from browser storage
    let getInfo = localStorage.getItem(VER_NUM);
    const [events, setEvents] = useState(getInfo ?
        JSON.parse(getInfo)['events'] : []
    );
    const [format, setFormat] = useState(getInfo ?
        JSON.parse(getInfo)['settings'][0] : false
    );
    const [start, setStart] = useState(getInfo ?
        JSON.parse(getInfo)['settings'][1] : 12
    );
    const [end, setEnd] = useState(getInfo ?
        JSON.parse(getInfo)['settings'][2] : 48
    );
    // TODO: Add variable to maintain custom user tags
    const [upcoming, setUpcoming] = useState({
        title: '',
        day: 'Sunday',
        start: 0,
        end: 0,
        tag: 0
    });
    const [oldid, setOldid] = useState(0);
    const [dialog, setDialog] = useState('');
    const [warning, setWarning] = useState('');
    const [mono, setMono] = useState(0);
    const [tagMapping, setTagMapping] = useState([1, 0, 3, 4]);
    
    // TODO: Add function to manage color mapping
    let d = document.querySelector(':root').style;
    d.setProperty('--t0-bg', lightColors[tagMapping[0]]);
    d.setProperty('--t1-bg', lightColors[tagMapping[1]]);
    d.setProperty('--t2-bg', lightColors[tagMapping[2]]);
    d.setProperty('--t3-bg', lightColors[tagMapping[3]]);
    d.setProperty('--t0-border', darkColors[tagMapping[0]]);
    d.setProperty('--t1-border', darkColors[tagMapping[1]]);
    d.setProperty('--t2-border', darkColors[tagMapping[2]]);
    d.setProperty('--t3-border', darkColors[tagMapping[3]]);

    // Imports events JSON
    const importEvents = () => {
        const file = document.createElement('input');
        file.type = 'file';
        file.hidden = true;
        document.body.appendChild(file);
        file.click();
        file.addEventListener('cancel', () => {
            file.remove();
        });
        file.addEventListener('change', () => {
            // Check for valid file type
            if (file.files[0].type === 'application/json') {
                // Read in file as text
                const reader = new FileReader();
                reader.addEventListener("load",() => {
                    const content = JSON.parse(reader.result);
                    // Parse as JSON and load in data
                    if (content.events) {
                        updateEvents(content.events);
                    }
                    if (content.settings) {
                        setSettings(content.settings);
                    }
                });
                reader.readAsText(file.files[0]);
            } else {
                setWarning('Please import a valid JSON file');
            }
            file.remove();
        });
    };

    // Export events as JSON
    const exportEvents = () => {
        const output = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({
            events: events,
            settings: [format, start, end]
        }))}`;
        const link = document.createElement('a');
        link.setAttribute('href', output);
        link.setAttribute('download', 'weeklies.json');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

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
            VER_NUM,
            JSON.stringify({
                events: list,
                settings: [format, start, end]
            })
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
            end: events[index].end,
            tag: events[index].tag
        });
        setDialog('edit');
    };

    // Imports time data for add event dialog
    const addUpcoming = (day, time) => {
        setUpcoming({
            title: '',
            day: day,
            start: time,
            end: (time + 2) % 48,
            tag: 0
        });
        setDialog('add');
    };

    // Set all 3 settings via import
    const setSettings = (settings) => {
        // TODO: Validate settings?
        setFormat(settings[0]);
        setStart(settings[1]);
        setEnd(settings[2]);
        localStorage.setItem(
            VER_NUM,
            JSON.stringify({
                events: events,
                settings: settings
            })
        );
    }

    // Toggles time format used
    const changeFormat = (inForm) => {
        let newForm = inForm ? inForm : !format;
        setFormat(newForm);
        localStorage.setItem(
            VER_NUM,
            JSON.stringify({
                events: events,
                settings: [newForm, start, end]
            })
        );
    };

    // Changes daily start time
    const changeStart = (num) => {
        setStart(num);
        localStorage.setItem(
            VER_NUM,
            JSON.stringify({
                events: events,
                settings: [format, num, end]
            })
        );
    }

    // Changes daily end time
    const changeEnd = (num) => {
        setEnd(num);
        localStorage.setItem(
            VER_NUM,
            JSON.stringify({
                events: events,
                settings: [format, start, num]
            })
        );
    }

    return (
        <div className='calendar'>
            <NavBar
                setDialog={setDialog}
                import={importEvents}
                export={exportEvents}/>
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
                toggleFormat={() => changeFormat(null)}/>
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
