import React, { Component } from 'react';

class SettingsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: (this.props.showDialog === 'settings'),
            inputText: ''
        }
    }

    render() {
        return (
            <>
                {(this.props.showDialog === 'settings') &&
                    <div className='settings overlay'>
                        <p> Settings List! </p>
                    </div>
                }
            </>
        )
    }
}

export default SettingsDialog;