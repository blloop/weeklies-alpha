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
                    <div className='settings overlay'>
                        <p> Settings List! </p>
                        <li> 12 / 24 Hour Time </li>
                        <li> Theme Color </li>
                        <li> First Day of Week Sun / Mon </li>
                        <button
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