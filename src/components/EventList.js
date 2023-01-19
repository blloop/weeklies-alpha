import React, { Component } from 'react';

// Positions events on calendar based on time
let formatEvent = (event, useMilitary) => {
    return (
        <div
            style={{
                top: 60 +
                    (event.hour * 50) +
                    (event.min === 30 ? 25 : 0),
                zIndex: 24 - event.hour
            }}
            className={'event'}
            key={event.title}>
            <p> {event.title} </p>
        </div >
    )
}

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
                <div className='column' id='Sunday'>
                    <div className='time-scale scale-left'>
                        {scaleTime()}{scaleTime()}
                    </div>
                    <p className='subtitle'> SUN </p>
                    <hr></hr>
                    {Sunday.map((event) => {
                        return (formatEvent(event));
                    })}
                </div>
                <div className='column' id='Monday'>
                    <p className='subtitle'> MON </p>
                    <hr></hr>
                    {Monday.map((event) => {
                        return (formatEvent(event));
                    })}
                </div>
                <div className='column' id='Tuesday'>
                    <p className='subtitle'> TUE </p>
                    <hr></hr>
                    {Tuesday.map((event) => {
                        return (formatEvent(event));
                    })}
                </div>
                <div className='column' id='Wednesday'>
                    <p className='subtitle'> WED </p>
                    <hr></hr>
                    {Wednesday.map((event) => {
                        return (formatEvent(event));
                    })}
                </div>
                <div className='column' id='Thursday'>
                    <p className='subtitle'> THU </p>
                    <hr></hr>
                    {Thursday.map((event) => {
                        return (formatEvent(event));
                    })}
                </div>
                <div className='column' id='Friday'>
                    <p className='subtitle'> FRI </p>
                    <hr></hr>
                    {Friday.map((event) => {
                        return (formatEvent(event));
                    })}
                </div>
                <div className='column' id='Saturday'>
                    <p className='subtitle'> SAT </p>
                    <hr></hr>
                    {Saturday.map((event) => {
                        return (formatEvent(event));
                    })}
                    <div className='time-scale scale-right'>
                        {scaleTime()}{scaleTime()}
                    </div>
                </div>
            </div>
        )
    }
}

export default EventList;