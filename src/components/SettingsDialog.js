import React, { Component } from 'react';

class SettingsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog,
            inputText: ''
        }
    }

    render() {
        return (
            <>
                {this.props.showDialog &&
                    <div className='settings overlay rounded'>
                        <button
                            onClick={this.props.closeModal}
                            className='close-button'>
                            &#10005;
                        </button>
                        <p> Settings </p>
                        <hr></hr>
                        <li> 12 / 24 Hour Time </li>
                        <li> Accent Color </li>
                        <li> First Day of Week Sun / Mon </li>
                        <button
                            className='contrast'
                            onClick={this.props.eventClear}>
                            Clear Events
                        </button>
                    </div>
                }
            </>
        )
    }
}

export default SettingsDialog;