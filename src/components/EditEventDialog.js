import React, { Component } from 'react';

class EditEventDialog extends Component {

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
                        <hr></hr>

                        <div className='settings-row'>
                            <p> Name of the Event </p>
                            <p> Time of the Event </p>
                        </div>


                    </div>
                }
            </>
        )
    }
}

export default EditEventDialog;