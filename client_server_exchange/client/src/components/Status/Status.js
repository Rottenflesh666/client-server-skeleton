import React from 'react';
import './Status.css';

const Status = (props) => (
  <div className={"status-group"}>
    <p>{props.status}</p>
  </div>
);

export default Status;
