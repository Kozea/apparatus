import React from 'react'

import Status from './Status'

export default function NotFound({ children }) {
  return <Status code={404}>{children}</Status>
}
