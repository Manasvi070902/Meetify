import React from 'react';
import { NavLink } from 'react-router-dom'

export const Toggle = ({ theme, toggleTheme }) => {
 console.log(theme)
  return (
    <div onClick={toggleTheme}>
      { theme === 'light' ? <NavLink className="nav-link mx-3" to="#">Dark Theme</NavLink>
      : <NavLink className="nav-link mx-3" to="#">Light Theme</NavLink>}
    </div>
  )

 }

 
 