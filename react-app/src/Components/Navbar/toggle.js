import React from 'react';

import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

//light , dark mode added
export const Toggle = ({ theme, toggleTheme }) => {
 console.log(theme)
  return (
    <div onClick={toggleTheme} style={{paddingRight:'20px'}}>
      { theme === 'light' ? <Brightness4Icon/>
      : <Brightness7Icon />}
    </div>
  )

 }

 
 