import { Alert } from 'react-bootstrap';
import React from 'react';

const MessageBox = (props) => {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
};

export default MessageBox;
