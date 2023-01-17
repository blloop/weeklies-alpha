import React, { Component } from 'react';
import ghLogo from '../img/github-mark.svg';
import gearLogo from '../img/gear.svg';
import AddEventDialog from './AddEventDialog';
import SettingsDialog from './SettingsDialog';
import Modal from './Modal';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: null
        }
    }

    openAddEvent() {
        // Check if any other dialog is open
        if (this.state.openDialog) {
            return;
        }
        let newState = {
            openDialog: 'events'
        }
        this.setState(newState);
    }

    openSettings() {
        // Check if any other dialog is open
        if (this.state.openDialog) {
            return;
        }
        let newState = {
            openDialog: 'settings'
        }
        this.setState(newState);
    }

    closeModal() {
        let newState = {
            openDialog: null
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className='navbar' >
                <button
                    type='button'
                    className='accent'
                    onClick={this.openAddEvent.bind(this)}>
                    Add Event
                </button>
                <p className='title rounded'> Weeklies </p>
                <div className='subbar'>
                    <a
                        href='https://github.com/blloop/weeklies'
                        target="_blank"
                        rel="noopener noreferrer">
                        <img
                            src={ghLogo}
                            alt='GitHub Link'
                            className='logo'>
                        </img>
                    </a>
                    <button
                        type='button'
                        className='contrast settings-button'
                        onClick={this.openSettings.bind(this)}>
                        <img
                            src={gearLogo}
                            alt='Settings Button'>
                        </img>
                    </button>
                </div>

                <Modal
                    closeModal={this.closeModal.bind(this)}
                    openModal={this.state.openDialog !== null}>
                </Modal>
                <AddEventDialog
                    eventAdd={this.props.eventAdd}
                    closeModal={this.closeModal.bind(this)}
                    showDialog={this.state.openDialog === 'events'}
                    useMilitary={this.props.useMilitary}>
                </AddEventDialog>
                <SettingsDialog
                    eventClear={this.props.eventClear}
                    closeModal={this.closeModal.bind(this)}
                    showDialog={this.state.openDialog === 'settings'}
                    toggleMilitary={this.props.toggleMilitary}>
                </SettingsDialog>
            </div >
        )
    }

}

export default NavBar;