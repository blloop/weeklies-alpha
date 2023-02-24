import React, { Component } from 'react';
import Modal from './Modal';
import EditEventDialog from './EditEventDialog';
import EventColumn from './EventColumn';
import { dayList } from './Data';

class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currDay: 0,
            openDialog: false,
            oldEvent: null,
            newEvent: null
        };
    }

    // Returns hourly intervals in a 12 hour span
    // Call twice for a full 24 hour span
    scaleTime = (useMilitary) => {
        return (
            useMilitary ?
                <>
                    <p>00:00</p><p>01:00</p><p>02:00</p><p>03:00</p>
                    <p>04:00</p><p>05:00</p><p>06:00</p><p>07:00</p>
                    <p>08:00</p><p>09:00</p><p>10:00</p><p>11:00</p>
                    <p>12:00</p><p>13:00</p><p>14:00</p><p>15:00</p>
                    <p>16:00</p><p>17:00</p><p>18:00</p><p>19:00</p>
                    <p>20:00</p><p>21:00</p><p>22:00</p><p>23:00</p>
                </> :
                <>
                    <p>12:00</p><p>01:00</p><p>02:00</p><p>03:00</p>
                    <p>04:00</p><p>05:00</p><p>06:00</p><p>07:00</p>
                    <p>08:00</p><p>09:00</p><p>10:00</p><p>11:00</p>
                    <p>12:00</p><p>01:00</p><p>02:00</p><p>03:00</p>
                    <p>04:00</p><p>05:00</p><p>06:00</p><p>07:00</p>
                    <p>08:00</p><p>09:00</p><p>10:00</p><p>11:00</p>
                </>
        );
    }

    // Changes current day in mono view
    changeDay = (val) => {
        let newState = {
            ...this.state,
            currDay: (this.state.currDay + val === -1 ?
                6 :
                (this.state.currDay + val) % 7
            )
        };
        this.setState(newState);
    }

    // Opens open popup editor
    // and prepares event values for edit tracking
    openPopup = (event) => {
        let eventID =
            (dayList.indexOf(event.day) * 48) +
            event.hour * 2 +
            (event.min === 0 ? 0 : 1);
        let tempEvent = {
            id: eventID,
            inputText: event.title,
            dayOfWeek: event.day,
            newHour: event.hour,
            isZero: event.min === 0,
            newHour2: event.hour2,
            isZero2: event.min2 === 0
        };
        let newState = {
            ...this.state,
            openDialog: true,
            oldEvent: tempEvent,
            newEvent: tempEvent
        };
        this.setState(newState);
    }

    // Closes popup editor
    closeModal = () => {
        let newState = {
            ...this.state,
            openDialog: false,
            oldEvent: null,
            newEvent: null
        };
        this.setState(newState);
    }

    // Returns array of N horizonal lines
    numLines = (num) => {
        let outLines = [];
        for (let i = 0; i < num; i++) {
            outLines.push(<hr key={i}></hr>)
        };
        return outLines;
    }

    // Calls for an event edit by passing
    // in previous event and new event
    editEvent = () => {
        this.closeModal();
        this.props.editEvent(
            this.state.oldEvent.id,
            this.state.newEvent
        );
    }

    // Calls for an event to be deleted
    // by passing oldEvent's id
    deleteEvent = () => {
        this.closeModal();
        this.props.deleteEvent(this.state.oldEvent.id);
    }

    // Updates placeholder event to track
    // new changes for upcoming event
    setNewEvent = (event) => {
        let tempEvent = {
            inputText: event.inputText,
            dayOfWeek: event.dayOfWeek,
            newHour: event.newHour,
            isZero: event.isZero,
            newHour2: (
                (event.newHour2 === 0
                    && event.newHour > event.newHour2
                    && event.isZero2) ?
                    24 :
                    event.newHour2
            ),
            isZero2: event.isZero2
        };
        let newState = {
            ...this.state,
            newEvent: tempEvent
        };
        this.setState(newState);
    }

    // Positions events on calendar based on time
    formatEvent = (event) => {
        return (
            <div
                style={{
                    top: 60 +
                        (event.hour * 50) +
                        (event.min === 30 ? 25 : 0) + 1.2,
                    height: ((
                        (event.hour2 || 0) -
                        (event.hour || 0)) * 50) +
                        ((event.min || 0) >
                            (event.min2 || 0) ? -25 : 0) +
                        ((event.min || 0) <
                            (event.min2 || 0) ? 25 : 0) - 2.2
                }}
                className={'event'}
                onClick={() => this.openPopup(event)}
                key={event.id}>
                <p> {event.title.length > 25 ?
                    event.title.slice(0, 25) + '...' :
                    event.title}
                </p>
            </div>
        );
    }

    render() {

        return (
            <div className='eventlist'>
                <Modal
                    closeModal={this.closeModal}
                    openModal={this.state.openDialog}>
                </Modal>
                <EditEventDialog
                    editEvent={this.editEvent}
                    deleteEvent={this.deleteEvent}
                    setNewEvent={this.setNewEvent}
                    newEvent={this.state.newEvent}
                    closeModal={this.closeModal}
                    showDialog={this.state.openDialog}
                    useMilitary={this.props.useMilitary}>
                </EditEventDialog>
                <div className='time-scale scale-left mono-hide'>
                    {this.scaleTime(this.props.useMilitary)}
                </div>
                <div className='grid-lines'>
                    {this.numLines(47)}
                </div>
                <div className='column utility mono-show'>
                    <button
                        onClick={() => this.changeDay(-1)}
                        className='switch move-left'>
                        &lt;
                    </button> {/* < */}
                    <button
                        onClick={() => this.changeDay(1)}
                        className='switch move-right'>
                        &gt;
                    </button> {/* > */}
                    <div className='time-scale scale-left'>
                        {this.scaleTime(this.props.useMilitary)}
                    </div>
                </div>
                <EventColumn
                    dayNum={0}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[0]
                    )}>
                </EventColumn>
                <EventColumn
                    dayNum={1}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[1]
                    )}>
                </EventColumn>
                <EventColumn
                    dayNum={2}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[2]
                    )}>
                </EventColumn>
                <EventColumn
                    dayNum={3}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[3]
                    )}>
                </EventColumn>
                <EventColumn
                    dayNum={4}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[4]
                    )}>
                </EventColumn>
                <EventColumn
                    dayNum={5}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[5]
                    )}>
                </EventColumn>
                <EventColumn
                    dayNum={6}
                    currDay={this.state.currDay}
                    formatEvent={this.formatEvent}
                    eList={this.props.allEvents.filter(
                        event => event.day === dayList[6]
                    )}>
                </EventColumn>
                <div className='time-scale scale-right mono-hide'>
                    {this.scaleTime(this.props.useMilitary)}
                </div>
            </div >
        );
    }
}

export default EventList;