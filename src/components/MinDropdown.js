import React, { Component } from 'react';

class MinDropdown extends Component {

    render() {
        return (
            <>
                <button
                    className='drop-box top-button square small'
                    onClick={this.props.changeMin}>
                    {this.props.isZero ? '00' : '30'}
                </button>
            </>
        )
    }
}

export default MinDropdown;