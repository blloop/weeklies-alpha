import React, { Component } from 'react';

class AddEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: (this.props.showDialog === 'events'),
            inputText: ''
        }
    }

    addToList() {
        this.props.eventAdd(this.state.inputText)
    }

    updateText = (event) => {
        let newState = {
            inputText: event.target.value
        }
        this.setState(newState);
        console.log(this.state.inputText);
    };

    render() {
        return (
            <>
                {(this.props.showDialog === 'events') &&
                    <div className='blackBorder'>
                        <button
                            onClick={this.addToList.bind(this)}>
                            Add Event
                        </button>
                        <input
                            onChange={this.updateText}
                            value={this.state.inputText}>
                        </input>
                    </div>
                }
            </>
        )
    }

}

export default AddEventDialog;