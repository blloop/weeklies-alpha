import React, { Component } from 'react';

class Modal extends Component {

    render() {
        return (
            <>
                {this.props.openModal ?
                    <div className='modal-bg'
                        onClick={this.props.closeModal}>
                    </div>
                    : null}
            </>
        );
    }
}

export default Modal;