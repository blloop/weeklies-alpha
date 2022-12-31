import React, { Component } from 'react';
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

    resetModal() {
        let newState = {
            openDialog: null
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className='navbar' >
                <button
                    onClick={this.openAddEvent.bind(this)}>
                    Add Event
                </button>
                <button
                    onClick={this.openSettings.bind(this)}>
                    Settings
                </button>

                <Modal
                    closeModal={this.resetModal.bind(this)}
                    openModal={this.state.openDialog !== null}>
                </Modal>
                <AddEventDialog
                    eventAdd={this.props.eventAdd}
                    showDialog={this.state.openDialog}>
                </AddEventDialog>
                <SettingsDialog
                    showDialog={this.state.openDialog}>
                </SettingsDialog>
            </div >
        )
    }

}

export default NavBar;