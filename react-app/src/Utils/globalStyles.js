import { createGlobalStyle } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

//handle light , dark mode
export const GlobalStyles = createGlobalStyle`
 
  
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Montserrat', sans-serif !important;
    transition: all .5s linear;
    margin:0;
  }

  h5 {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    transition: all .5s linear;
  }
  .custom-nav{
    background: ${({ theme }) => theme.navbar} !important;
   
  }
  
  .MuiPaper-root{
    background-color: ${({ theme }) => theme.drawer}  !important;
    color: ${({ theme }) => theme.icon} !important ;
    
  }
  .MuiIconButton-root{
    color: ${({ theme }) => theme.icon} !important ;

  }
  .MuiListItemIcon-root{
    color: ${({ theme }) => theme.icon} !important ;
  
  }
  .MuiInputBase-root{
    color: ${({ theme }) => theme.text} !important;
  }
  .MuiFormLabel-root{
    color: ${({ theme }) => theme.text};
  }
  .MuiInputBase-input{
    color: ${({ theme }) => theme.text} !important;
  }
  .MuiTypography-colorTextSecondary{
    color: ${({ theme }) => theme.text} !important;
  }
  .card{
    background: ${({ theme }) => theme.drawer} !important;
  }
  .viewmember{
    background: ${({ theme }) => theme.drawer} !important;
  }
  td{
    color: ${({ theme }) => theme.text} !important;
  }
  .card a {
    color: ${({ theme }) => theme.text} !important;
    
  }
`;
export const useStyles = makeStyles((theme) => ({
  
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  }));
export const lightTheme = {
  body: '#fff',
  text: '#000000',
  primary: '#121212',
  navbar: '#3c5458',
  drawer:'fff',
  
  icon:'rgb(178, 178, 178);'
  

 
};

export const darkTheme = {
  body: '#121212',
  text: '#ffffff',
  primary: 'radial-gradient(#eff1ff, #2f2f2f)',
  navbar: '#333333',
  drawer:'#333333',
  icon: '#fff'

};