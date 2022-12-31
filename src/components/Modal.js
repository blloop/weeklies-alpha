import React, { Component } from 'react';

class Modal extends Component {

    render() {
        return (
            <>
                {this.props.openModal ?

                    <div
                        onClick={this.props.closeModal}
                        className='modal-bg'>
                    </div>

                    : null}
            </>
        )
    }
}

export default Modal;