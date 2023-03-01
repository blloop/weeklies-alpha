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
            (this.props.format ? [
                0, 1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23
            ] : [
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12
            ]);

        return (
            <div className='drop-container'>
                <button
                    className='drop-box top-button square small'
                    onClick={this.toggleOpen}>
                    {this.props.format ?
                        this.props.hour :
                        ((((this.props.hour / 2) - 1) % 12) + 1)
                    }
                </button>
                {this.state.open ? (
                    <ul className='dropdown wide'>
                        {HoursList.map((hour) =>
                            <button
                                key={hour}
                                className='drop-box square small'
                                onClick={() => {
                                    this.setHour(
                                        this.props.format ?
                                            hour :
                                            (hour === 12 ? 0 : hour * 2) +
                                            (this.props.hour < 24 ? 0 : 24)
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