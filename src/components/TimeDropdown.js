import React, { Component } from 'react';

class TimeDropdown extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         open: false
    //     }
    // }

    render() {
        let outTime = '';
        if (this.props.timeOfDay > 25 && !this.props.useMilitary) {
            outTime += Math.floor(
                (this.props.timeOfDay - 24) / 2
            ).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        } else {
            outTime += Math.floor(
                this.props.timeOfDay / 2
            ).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        }
        (this.props.timeOfDay % 2 === 0 ? outTime += ':00 ' : outTime += ':30 ');
        if (!this.props.useMilitary) {
            (this.props.timeOfDay > 23 ? outTime += 'PM' : outTime += 'AM');
        }

        return (
            <div className='scroll-container row-items'>
                <button className='scroll-box'> {outTime} </button>
                <div className='column-items'>
                    <button
                        className='time-button'
                        onClick={() => this.props.changeTime(1)}>
                        ^
                    </button>
                    <button
                        className='time-button'
                        onClick={() => this.props.changeTime(-1)}>
                        v
                    </button>
                </div>
            </div>
        )
    }
}

export default TimeDropdown;