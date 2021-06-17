import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Montserrat', sans-serif;
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
    color:${({ theme }) => theme.body}
   
  }
`;

export const lightTheme = {
  body: '#fff',
  text: '#4b53bc',
  primary: '#121212',
  navbar: '#3c5458'

 
};

export const darkTheme = {
  body: '#121212',
  text: 'rgb(178, 178, 178);',
  primary: 'radial-gradient(#eff1ff, #2f2f2f)',
  navbar: '#333333'
};