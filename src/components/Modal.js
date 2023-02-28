import React from 'react';

const Modal = props => {
    <div
        className='modal-bg'
        style={{ zIndex: props.zIndex }}
        onClick={() => props.setDialog(null)}>
    </div>
}

export default Modal;