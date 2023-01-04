import React, { Component } from 'react';

class EventList extends Component {

    // constructor(props) {
    //     super(props);
    // }

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
                Sunday.push(<li key={value.title}>{value.title}</li>) :
                (value.day === 'Monday' ?
                    Monday.push(<li key={value.title}>{value.title}</li>) :
                    (value.day === 'Tuesday' ?
                        Tuesday.push(<li key={value.title}>{value.title}</li>) :
                        (value.day === 'Wednesday' ?
                            Wednesday.push(<li key={value.title}>{value.title}</li>) :
                            (value.day === 'Thursday' ?
                                Thursday.push(<li key={value.title}>{value.title}</li>) :
                                (value.day === 'Friday' ?
                                    Friday.push(<li key={value.title}>{value.title}</li>) :
                                    (value.day === 'Saturday' ?
                                        Saturday.push(<li key={value.title}>{value.title}</li>) : null))))))
        ))

        return (
            <div className='eventlist'>
                <div className='column' id='Sunday'>
                    <p> SUN </p>
                    <hr></hr>
                    {Sunday}
                </div>
                <div className='column' id='Monday'>
                    <p> MON </p>
                    <hr></hr>
                    {Monday}
                </div>
                <div className='column' id='Tuesday'>
                    <p> TUE </p>
                    <hr></hr>
                    {Tuesday}
                </div>
                <div className='column' id='Wednesday'>
                    <p> WED </p>
                    <hr></hr>
                    {Wednesday}
                </div>
                <div className='column' id='Thursday'>
                    <p> THU </p>
                    <hr></hr>
                    {Thursday}
                </div>
                <div className='column' id='Friday'>
                    <p> FRI </p>
                    <hr></hr>
                    {Friday}
                </div>
                <div className='column' id='Saturday'>
                    <p> SAT </p>
                    <hr></hr>
                    {Saturday}
                </div>
            </div>
        )
    }
}

export default EventList;