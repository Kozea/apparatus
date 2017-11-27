import React from 'react'

import Status from './Status'

export default function NotFound() {
  return (
    <section>
      <Status code={404}>
        <mark>Not found</mark>
      </Status>
    </section>
  )
}
