import React, { Component } from 'react';

class EventList extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='eventlist'>
                {this.props.EventsList.map((value) => (
                    <p key={value}>{value}</p>
                ))}
            </div>
        )
    }
}

export default EventList;