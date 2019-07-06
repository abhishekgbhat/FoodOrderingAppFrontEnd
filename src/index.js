import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import App from "./screens/App";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

const theme = createMuiTheme({
    palette: {
       primary: {
          light: '#fff',
          main: "#3f51b5",
          dark: '#000'
       }
    },
    typography: { 
       useNextVariants: true
    }
 });

ReactDOM.render(
     <MuiThemeProvider theme = { theme }>
      <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();