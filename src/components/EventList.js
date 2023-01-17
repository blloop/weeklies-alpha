import React, { Component } from 'react';

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
                Sunday.push(<p key={value.title}>
                    {value.title}{value.hour}{value.min}
                </p>) :
                (value.day === 'Monday' ?
                    Monday.push(<p key={value.title}>
                        {value.title}{value.hour}{value.min}
                    </p>) :
                    (value.day === 'Tuesday' ?
                        Tuesday.push(<p key={value.title}>
                            {value.title}{value.hour}{value.min}
                        </p>) :
                        (value.day === 'Wednesday' ?
                            Wednesday.push(<p key={value.title}>
                                {value.title}{value.hour}{value.min}
                            </p>) :
                            (value.day === 'Thursday' ?
                                Thursday.push(<p key={value.title}>
                                    {value.title}{value.hour}{value.min}
                                </p>) :
                                (value.day === 'Friday' ?
                                    Friday.push(<p key={value.title}>
                                        {value.title}{value.hour}{value.min}
                                    </p>) :
                                    (value.day === 'Saturday' ?
                                        Saturday.push(<p key={value.title}>
                                            {value.title}{value.hour}{value.min}
                                        </p>) : null))))))
        ))

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