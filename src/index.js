import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeProvider, theme, CSSReset, ColorModeProvider } from '@chakra-ui/core'

function AppWrapped() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <AppWrapped />, 
  document.getElementById('root')
);
