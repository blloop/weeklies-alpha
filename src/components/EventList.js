import React, { Component } from 'react';

let formatEvent = (value, useMilitary) => {
    return (useMilitary ?
        `Time: ${value.hour}: ${value.min}` :
        (value.hour > 11 ?
            `Time: ${value.hour - 12}: ${value.min}PM` :
            `Time: ${value.hour}: ${value.min}AM`
        )
    );
}

class EventList extends Component {

    render() {
        let Sunday = [];
        let Monday = [];
        let Tuesday = [];
        let Wednesday = [];
        let Thursday = [];
        let Friday = [];
        let Saturday = [];

        this.props.allEvents.map((value) => (
            value.day === 'Sunday' ?
                Sunday.push(<div className={'event'} key={value.title}>
                    <p> {value.title} </p>
                    <p> {formatEvent(value, this.props.useMilitary)} </p>
                </div>) :
                (value.day === 'Monday' ?
                    Monday.push(<div class={'event'} key={value.title}>
                        <p> {value.title} </p>
                        <p> {formatEvent(value, this.props.useMilitary)} </p>
                    </div>) :
                    (value.day === 'Tuesday' ?
                        Tuesday.push(<div class={'event'} key={value.title}>
                            <p> {value.title} </p>
                            <p> {formatEvent(value, this.props.useMilitary)} </p>
                        </div>) :
                        (value.day === 'Wednesday' ?
                            Wednesday.push(<div class={'event'} key={value.title}>
                                <p> {value.title} </p>
                                <p> {formatEvent(value, this.props.useMilitary)} </p>
                            </div>) :
                            (value.day === 'Thursday' ?
                                Thursday.push(<div class={'event'} key={value.title}>
                                    <p> {value.title} </p>
                                    <p> {formatEvent(value, this.props.useMilitary)} </p>
                                </div>) :
                                (value.day === 'Friday' ?
                                    Friday.push(<div class={'event'} key={value.title}>
                                        <p> {value.title} </p>
                                        <p> {formatEvent(value, this.props.useMilitary)} </p>
                                    </div>) :
                                    (value.day === 'Saturday' ?
                                        Saturday.push(<div class={'event'} key={value.title}>
                                            <p> {value.title} </p>
                                            <p> {formatEvent(value, this.props.useMilitary)} </p>
                                        </div>) : null))))))))

        return (
            <div className='eventlist'>
                <div className='column' id='Sunday'>
                    <p className='subtitle'> SUN </p>
                    <hr></hr>
                    {Sunday}
                </div>
                <div className='column' id='Monday'>
                    <p className='subtitle'> MON </p>
                    <hr></hr>
                    {Monday}
                </div>
                <div className='column' id='Tuesday'>
                    <p className='subtitle'> TUE </p>
                    <hr></hr>
                    {Tuesday}
                </div>
                <div className='column' id='Wednesday'>
                    <p className='subtitle'> WED </p>
                    <hr></hr>
                    {Wednesday}
                </div>
                <div className='column' id='Thursday'>
                    <p className='subtitle'> THU </p>
                    <hr></hr>
                    {Thursday}
                </div>
                <div className='column' id='Friday'>
                    <p className='subtitle'> FRI </p>
                    <hr></hr>
                    {Friday}
                </div>
                <div className='column' id='Saturday'>
                    <p className='subtitle'> SAT </p>
                    <hr></hr>
                    {Saturday}
                </div>
            </div>
        )
    }
}

export default EventList;