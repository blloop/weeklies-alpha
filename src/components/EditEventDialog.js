import React, { Component } from 'react';

class EditEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: this.props.showDialog,
            inputText: '',
            dayOfWeek: 'Sunday',
            newHour: 0,
            isZero: true,
            newHour2: 0,
            isZero2: true
        }
    }

    updateText = (event) => {
        let newState = {
            ...this.state,
            inputText: event.target.value
        }
        this.setState(newState);
    };

    render() {
        return (
            <>
                {this.props.openPopup &&
                    <div className='overlay rounded'>
                        <button
                            onClick={this.props.closeModal}
                            className='close-button'>
                            &#10005;
                        </button>
                        <p className='subtitle'> Edit Event </p>
                        <input
                            onChange={this.updateText}
                            value={this.state.inputText}>
                        </input>
                        <div className='settings-row'>
                            <p> {this.props.selectDay} </p>
                            <p> {this.props.selectHour} </p>
                            <p> {this.props.selectMin} </p>
                        </div>


                    </div>
                }
            </>
        )
    }
}

export default EditEventDialog;