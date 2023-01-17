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
                        <p className='subtitle'> Settings </p>
                        <hr></hr>
                        <div className='settings-row'>
                            <input
                                type={'checkbox'}
                                onClick={this.props.toggleMilitary}>
                            </input>
                            <p> 12 / 24 Hour Time </p>
                        </div>
                        <div className='settings-row'>
                            <input type={'checkbox'}></input>
                            <p> Accent Color </p>
                        </div>
                        {/* <div className='settings-row'>
                            <input type={'checkbox'}></input>
                            <p> First Day of Week Sun / Mon </p>
                        </div> */}
                        <button
                            className='contrast thin-button'
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