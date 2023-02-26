import React, { Component } from 'react';
import Modal from './Modal';
import WarningDialog from './WarningDialog';
import { colorNames, darkColors } from './Data';

class SettingsDialog extends Component {

    render() {
        let colorButtons = [];
        for (let i = 0; i < colorNames.length; i++) {
            colorButtons.push(
                <div
                    key={i}
                    style={{ backgroundColor: darkColors[i] }}
                    checked={this.props.accentColor === colorNames[i]}
                    onClick={() => this.props.changeColor(i)}>
                </div>
            )
        }
        return (
            <>
                {this.props.showDialog &&
                    <div className='settings overlay rounded'>
                        <button
                            onClick={this.props.closeModal}
                            className='close-button'>
                            &#10005;
                        </button>
                        <Modal></Modal>
                        <WarningDialog></WarningDialog>
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
                                {colorButtons}
                            </div>
                        </div>
                        <button
                            className='contrast thin-button'
                            onClick={this.props.clearEvents}>
                            Clear Events
                        </button>
                    </div>
                }
            </>
        );
    }
}

export default SettingsDialog;