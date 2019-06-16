import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('#modalRoot');

class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      modalRoot
    );
  }
}

export default Modal;