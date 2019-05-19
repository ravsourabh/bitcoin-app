import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
	    useNextVariants: true,
	  },
  palette: {
    primary: {
      light: '#316189',
      main: '#1C4D76',
      dark: '#0D3B61',
      contrastText: '#fff',
    },
    error: {
      light: '#D46843',
      main: '#B74822',
      dark: '#6C1C00',
      contrastText: '#fff',
    }
  },
});

class App extends React.Component {
    render () {
        return (
        	<MuiThemeProvider theme={theme}>
        		<Main />
        	</MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />,document.getElementById('root'));