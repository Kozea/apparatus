import React from 'react'
import { Redirect as RRRedirect } from 'react-router-dom'

import Status from './Status'

export default function Redirect({ code, url }) {
  return (
    <Status code={code || 302} url={url}>
      <RRRedirect to={url} />
    </Status>
  )
}
