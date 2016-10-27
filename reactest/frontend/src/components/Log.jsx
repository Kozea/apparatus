import React, { Component } from 'react';
import {pacomo} from '../utils'


export default pacomo.transformer(
  function Log(props) {
    return (
      <div>
        <ul className='list'>
          {props.log.map(log => (
            <li key={log.id} className='line'>Log: {log.text}</li>
          ))}
        </ul>
      </div>
    );
  }
);
