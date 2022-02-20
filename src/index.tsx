import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import store from './store/index';

import { ThemeProvider } from './contexts/ThemeContext';
import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
    }

    .container {
        margin: 0 auto;
        height: 100%;
        width: 1222px;
      }
    
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        height: 100%;
    }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles/>
        <App />
      </ThemeProvider>
      <Toaster />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

