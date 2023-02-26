import React from 'react';

const Modal = props => {
    props.isOpen ?
        <div
            className='modal-bg'
            style={{ zIndex: props.zIndex }}
            onClick={() => props.setDialog(null)}>
        </div>
        : null
}

export default Modal;