import React, { Component } from 'react';

class SettingsDialog extends Component {

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
                            <p> Use 24 Hour Time </p>
                            <input
                                type={'checkbox'}
                                checked={this.props.useMilitary}
                                onChange={this.props.toggleMilitary}>
                            </input>
                        </div>
                        <div className='settings-row'>
                            <p> Accent Color: </p>
                            <input
                                type={'radio'}
                                name={'color'}
                                checked={this.props.accentColor === 'red'}
                                onChange={() => this.props.changeColor('red')}>
                            </input>
                            <p> Red </p>
                            <input
                                type={'radio'}
                                name={'color'}
                                checked={this.props.accentColor === 'blue'}
                                onChange={() => this.props.changeColor('blue')}>
                            </input>
                            <p> Blue </p>
                            <input
                                type={'radio'}
                                name={'color'}
                                checked={this.props.accentColor === 'green'}
                                onChange={() => this.props.changeColor('green')}>
                            </input>
                            <p> Green </p>
                        </div>
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