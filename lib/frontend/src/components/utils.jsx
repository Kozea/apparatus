import React from 'react'
import { NavLink } from 'react-router-dom'

export const Link = ({ className, ...props }) => (
  <NavLink
    className={className.s}
    activeClassName={className.m({ active: true }).s}
    {...props}
  />
)
