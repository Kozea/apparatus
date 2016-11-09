import React, { Component } from 'react'
import { block } from '../utils'
import './LogList.sass'


export default function LogList({ messages, onLogClick }) {
  const b = block('LogList')
  return (
    <div className={ b }>
      <ul className={ b('list') }>
        {messages.map(message => (
          <li key={message.id} onClick={() => onLogClick(message.id) } className={ b('line') }>{message.text}</li>
        ))}
      </ul>
    </div>
  )
}
