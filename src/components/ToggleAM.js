import React, { Component } from 'react';

class ToggleAM extends Component {

    render() {
        return (
            <>
                {this.props.useMilitary ? null :
                    <button
                        className='drop-box top-button square small'
                        onClick={this.props.changeAM}>
                        {this.props.isAM ? 'AM' : 'PM'}
                    </button>
                }
            </>
        );
    }
}

export default ToggleAM;