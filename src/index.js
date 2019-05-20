import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
	    useNextVariants: true, //required to use material-ui typography without warning
	},
	palette: {
		primary: {
		  main: '#295fa6'
		},
		error: {
		  main: '#CB3642',
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