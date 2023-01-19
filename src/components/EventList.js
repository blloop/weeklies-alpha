import React, { Component } from 'react';

let formEvent = (event, useMilitary) => {
    return (
        <div
            style={{
                top: event.hour * 50,
                zIndex: 24 - event.hour
            }}
            className={'event'}
            key={event.title} >
            <p> {event.title} </p>
            <p> {(useMilitary ?
                `Time: ${event.hour}: ${event.min}` :
                (event.hour > 11 ?
                    `${(event.hour - 12 === 0 ?
                        12 :
                        event.hour - 12).toLocaleString(
                            'en-US', { minimumIntegerDigits: 2 }
                        )}:${event.min === 0 ? '00' : '30'} PM` :
                    `${event.hour.toLocaleString(
                        'en-US', { minimumIntegerDigits: 2 }
                    )}:${event.min === 0 ? '00' : '30'} AM`
                )
            )} </p>
        </div >
    )
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
                    <p className='subtitle'> SUN </p>
                    <hr></hr>
                    {Sunday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
                <div className='column' id='Monday'>
                    <p className='subtitle'> MON </p>
                    <hr></hr>
                    {Monday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
                <div className='column' id='Tuesday'>
                    <p className='subtitle'> TUE </p>
                    <hr></hr>
                    {Tuesday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
                <div className='column' id='Wednesday'>
                    <p className='subtitle'> WED </p>
                    <hr></hr>
                    {Wednesday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
                <div className='column' id='Thursday'>
                    <p className='subtitle'> THU </p>
                    <hr></hr>
                    {Thursday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
                <div className='column' id='Friday'>
                    <p className='subtitle'> FRI </p>
                    <hr></hr>
                    {Friday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
                <div className='column' id='Saturday'>
                    <p className='subtitle'> SAT </p>
                    <hr></hr>
                    {Saturday.map((event) => {
                        return (formEvent(event));
                    })}
                </div>
            </div>
        )
    }
}

export default EventList;