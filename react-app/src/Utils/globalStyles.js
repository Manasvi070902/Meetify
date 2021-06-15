import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all .5s linear;
  }
 
  h4 {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    transition: all .5s linear;
  }
`;

export const lightTheme = {
  body: '#fff',
  text: '#121212',
  primary: 'radial-gradient(#eff1ff, #2f2f2f)'
 
};

export const darkTheme = {
  body: '#121212',
  text: 'rgb(178, 178, 178);',
  primary: 'radial-gradient(#eff1ff, #2f2f2f)',
};