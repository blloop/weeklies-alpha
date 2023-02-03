import React, { Component } from 'react';

let darkColors = [
    'rgb(255, 89, 89)',
    'rgb(97, 218, 73)',
    'rgb(103, 139, 255)',
    'rgb(223, 194, 50)'
];

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
                            <div className='color-palette'>
                                <div
                                    style={{ backgroundColor: darkColors[0] }}
                                    checked={this.props.accentColor === 'red'}
                                    onClick={() => this.props.changeColor(0)}>
                                </div>
                                <div
                                    style={{ backgroundColor: darkColors[1] }}
                                    checked={this.props.accentColor === 'green'}
                                    onClick={() => this.props.changeColor(1)}>
                                </div>
                                <div
                                    style={{ backgroundColor: darkColors[2] }}
                                    checked={this.props.accentColor === 'blue'}
                                    onClick={() => this.props.changeColor(2)}>
                                </div>
                                <div
                                    style={{ backgroundColor: darkColors[3] }}
                                    checked={this.props.accentColor === 'yellow'}
                                    onClick={() => this.props.changeColor(3)}>
                                </div>
                            </div>
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