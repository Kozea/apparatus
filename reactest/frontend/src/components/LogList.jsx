import React, { Component } from 'react'
import { pacomo } from '../utils'
import './LogList.sass'


export default pacomo.transformer(
  function LogList({ messages, onLogClick }) {
    return (
      <div>
        <ul className='list'>
          {messages.map(message => (
            <li key={message.id} onClick={() => onLogClick(message.id) } className='line'>{message.text}</li>
          ))}
        </ul>
      </div>
    )
  }
)
