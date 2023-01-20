import React, { Component } from 'react';
import Modal from './Modal';
import EditEventDialog from './EditEventDialog';

// Returns hourly intervals in a 12 hour span
// Call twice for a full 24 hour span
let scaleTime = () => {
    return (
        <>
            <p>12:00</p><p>01:00</p>
            <p>02:00</p><p>03:00</p>
            <p>04:00</p><p>05:00</p>
            <p>06:00</p><p>07:00</p>
            <p>08:00</p><p>09:00</p>
            <p>10:00</p><p>11:00</p>
        </>
    );
}

class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currDay: 1,
            popOpen: false
        }
    }

    // Changes current day in mono view
    changeDay = (val) => {
        let newState = {
            ...this.state,
            currDay: (this.state.currDay + val === -1 ?
                6 :
                (this.state.currDay + val) % 7
            )
        }
        this.setState(newState);
    }

    // Opens open popup editor
    openPopup = () => {
        let newState = {
            ...this.state,
            popOpen: true
        }
        this.setState(newState);
    }

    // Closes open popup editor
    closePopup = () => {
        let newState = {
            ...this.state,
            popOpen: false
        }
        this.setState(newState);
    }

    // Positions events on calendar based on time
    formatEvent = (event) => {
        return (
            <div
                style={{
                    top: 60 +
                        (event.hour * 50) +
                        (event.min === 30 ? 25 : 0),
                    height: ((
                        (event.hour2 || 0) -
                        (event.hour || 0)) * 50) +
                        ((event.min || 0) >
                            (event.min2 || 0) ? -25 : 0) +
                        ((event.min || 0) <
                            (event.min2 || 0) ? 25 : 0)
                }}
                className={'event'}
                onClick={this.openPopup}
                key={event.title}>
                <p> {event.title} </p>
            </div>
        )
    }

    render() {
        let Sunday = this.props.allEvents.filter(
            event => event.day === 'Sunday'
        );
        let Monday = this.props.allEvents.filter(
            event => event.day === 'Monday'
        );
        let Tuesday = this.props.allEvents.filter(
            event => event.day === 'Tuesday'
        );
        let Wednesday = this.props.allEvents.filter(
            event => event.day === 'Wednesday'
        );
        let Thursday = this.props.allEvents.filter(
            event => event.day === 'Thursday'
        );
        let Friday = this.props.allEvents.filter(
            event => event.day === 'Friday'
        );
        let Saturday = this.props.allEvents.filter(
            event => event.day === 'Saturday'
        );

        return (
            <div className='eventlist'>
                <Modal
                    closeModal={this.closePopup}
                    openModal={this.state.popOpen}>
                </Modal>
                <EditEventDialog
                    closeModal={this.closePopup}
                    openPopup={this.state.popOpen}>
                </EditEventDialog>
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
                        {scaleTime()}{scaleTime()}{/* Left Scale */}
                    </div>
                </div>
                <div className={'column' +
                    (this.state.currDay === 0 ?
                        '' : ' mono-hide')
                }>
                    <div className='time-scale scale-left mono-hide'>
                        {scaleTime()}{scaleTime()}{/* Left Scale */}
                    </div>
                    <p className='subtitle'> SUN </p>
                    <hr></hr>
                    {Sunday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                </div>
                <div className={'column' +
                    (this.state.currDay === 1 ?
                        '' : ' mono-hide')
                }>
                    <p className='subtitle'> MON </p>
                    <hr></hr>
                    {Monday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                </div>
                <div className={'column' +
                    (this.state.currDay === 2 ?
                        '' : ' mono-hide')
                }>
                    <p className='subtitle'> TUE </p>
                    <hr></hr>
                    {Tuesday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                </div>
                <div className={'column' +
                    (this.state.currDay === 3 ?
                        '' : ' mono-hide')
                }>
                    <p className='subtitle'> WED </p>
                    <hr></hr>
                    {Wednesday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                </div>
                <div className={'column' +
                    (this.state.currDay === 4 ?
                        '' : ' mono-hide')
                }>
                    <p className='subtitle'> THU </p>
                    <hr></hr>
                    {Thursday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                </div>
                <div className={'column' +
                    (this.state.currDay === 5 ?
                        '' : ' mono-hide')
                }>
                    <p className='subtitle'> FRI </p>
                    <hr></hr>
                    {Friday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                </div>
                <div className={'column' +
                    (this.state.currDay === 6 ?
                        '' : ' mono-hide')
                }>
                    <p className='subtitle'> SAT </p>
                    <hr></hr>
                    {Saturday.map((event) => {
                        return (this.formatEvent(event));
                    })}
                    <div className='time-scale scale-right mono-hide'>
                        {scaleTime()}{scaleTime()}{/* Right Scale */}
                    </div>
                </div>
            </div>
        )
    }
}

export default EventList;