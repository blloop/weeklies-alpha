import React, { Component } from 'react';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        }
    }

    addToList() {
        this.props.EventAdd(this.state.inputText)
    }

    clearList() {
        this.props.EventClear();
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
            <div>
                <button
                    onClick={this.addToList.bind(this)}>
                    Add Event
                </button>
                <button
                    onClick={this.clearList.bind(this)}>
                    Clear Events
                </button>
                <input
                    onChange={this.updateText}
                    value={this.state.inputText}>
                </input>
            </div>
        )
    }

}

export default NavBar;