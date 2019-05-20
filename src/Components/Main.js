import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card,Typography,Button, AppBar, Toolbar } from '@material-ui/core';
import { NameScreen,CurrencyScreen,OutputScreen } from './Screens';
//NameScreen is first screen, that takes Name as input
//CurrencyScreen is second screen, that searches and enters currency like USD,INR,etc
//OutputScreen displays entrered currency value in bitcoin

class Main extends React.Component {
	state = {
		screen: 0,	//0=NameScreen, 1=CurrencyScreen, 2=OutputScreen
		currency: ''	//stores currency short codes USD,INR, etc
	};

	componentDidMount() {
		//if name already entered than goto CurrencyScreen
		if(localStorage.getItem('userName')) { //using localStorage to store 'name' of user
			this.setState({
				screen: 1
			});
		}
	};

	logout = event => {
		localStorage.removeItem('access');
		this.setState({
			screen: 0
		});
	};

	headline() {
		//Using this function to display headline, which depends on the screen we are in
		const { screen } = this.state;
		if(screen===0) {
			return "Login";
		}
		else if(screen===1) {
			return `Hello, ${localStorage.getItem('userName')}!`;
		}
		else if(screen===2) {
			return `Results`;
		}
	};

  	gotoSecondScreen = event => {
  		//navigates to second screen
  		this.setState({
  			screen: 1
  		});
  	};

  	currencySet = (currency,event) => {
  		//takes currency(USD,INR,etc) as input and navigates to last screen
  		this.setState({
  			screen: 2,
  			currency
  		});
  	};

    render () {
    	const { classes } = this.props;
        return (
        	<div className={classes.mainContent}>
        		<AppBar position="static" color="primary" className={classes.appBar}>
			        <Toolbar className={classes.toolbar}>
			          <Typography variant="h6" color="inherit">
			            Bitcoin Conversion
			          </Typography>
			          <Button color="inherit" onClick={this.logout}>Logout</Button>
			        </Toolbar>
		    	</AppBar>
        		<Typography variant="h4" className={classes.head}>
	        		{this.headline()}
	        	</Typography>
	        	<div className={classes.wrapper}>
	        	<Card className={classes.card}>
	        		{this.state.screen===0 &&
		        		<NameScreen gotoSecondScreen={this.gotoSecondScreen} />
	        		}
	        		{this.state.screen===1 &&
	        			<CurrencyScreen currencySet={this.currencySet} />
	        		}
	        		{this.state.screen===2 &&
	        			<OutputScreen currency={this.state.currency} goBack={this.gotoSecondScreen} />
	        		}
	        	</Card>
	        	</div>
        	</div>
        );
    }
};

const styles = theme => ({
	head: {
		marginTop: "1em",
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			marginTop: "0.5em"
		},
	},
	card: {
		backgroundColor: '#dadada',
		marginTop: "0.5em",
		width: "60%",
		padding: "2em",
		height: "18em",
		[theme.breakpoints.down('xs')]: {
			width: "95%",
			marginTop: "0.25em",
			padding: "3em",
			height: "20em"
		},
	},
	wrapper: {
		[theme.breakpoints.down('md')]: {
			padding: 0
		},
		display: "flex",
		justifyContent: "center"
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between'
	}
});

export default withStyles(styles)(Main);
