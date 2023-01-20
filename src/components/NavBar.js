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

    // Opens AddEvent dialog
    openAddEvent = () => {
        // Check if any other dialog is open
        if (this.state.openDialog) {
            return;
        }
        let newState = {
            openDialog: 'events'
        }
        this.setState(newState);
    }

    // Opens Settings dialog
    openSettings = () => {
        // Check if any other dialog is open
        if (this.state.openDialog) {
            return;
        }
        let newState = {
            openDialog: 'settings'
        }
        this.setState(newState);
    }

    // Closes all open dialogs
    closeModal = () => {
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
                    onClick={this.openAddEvent}>
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
                        onClick={this.openSettings}>
                        <img
                            src={gearLogo}
                            alt='Settings Button'>
                        </img>
                    </button>
                </div>

                <Modal
                    closeModal={this.closeModal}
                    openModal={this.state.openDialog !== null}>
                </Modal>
                <AddEventDialog
                    eventAdd={this.props.eventAdd}
                    closeModal={this.closeModal}
                    showDialog={this.state.openDialog === 'events'}
                    useMilitary={this.props.useMilitary}>
                </AddEventDialog>
                <SettingsDialog
                    eventClear={this.props.eventClear}
                    closeModal={this.closeModal}
                    showDialog={this.state.openDialog === 'settings'}
                    accentColor={this.props.accentColor}
                    changeColor={this.props.changeColor}
                    useMilitary={this.props.useMilitary}
                    toggleMilitary={this.props.toggleMilitary}>
                </SettingsDialog>
            </div >
        )
    }

}

export default NavBar;