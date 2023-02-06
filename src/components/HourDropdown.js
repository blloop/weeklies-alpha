import React, { Component } from 'react';

class HourDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    // Toggles dropdown open state
    toggleOpen = () => {
        this.setState({
            open: !this.state.open
        });
    }

    // Sets dropdown value
    setHour = (hour) => {
        this.props.changeHour(hour);
        this.toggleOpen();
    }

    render() {
        let HoursList =
            (this.props.useMilitary ? [
                0, 1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23
            ] : [
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12
            ]);

        let currHour = (this.props.useMilitary ?
            this.props.newHour :
            (this.props.newHour % 12 === 0 ?
                12 :
                this.props.newHour % 12
            ));

        return (
            <div className='drop-container'>
                <button
                    className='drop-box top-button square small'
                    onClick={this.toggleOpen}>
                    {currHour}
                </button>
                {this.state.open ? (
                    <ul className='dropdown wide'>
                        {HoursList.map((hour) =>
                            <button
                                key={hour}
                                className='drop-box square small'
                                onClick={() => {
                                    this.setHour(
                                        this.props.useMilitary ?
                                            hour :
                                            (hour === 12 ? 0 : hour) +
                                            (this.props.isAM ? 0 : 12)
                                    )
                                }}>
                                {hour}
                            </button>
                        )}
                    </ul>
                ) : null
                }
            </div>
        );
    }
}

export default HourDropdown;