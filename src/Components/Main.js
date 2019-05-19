import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card,Typography,TextField,Button } from '@material-ui/core';
import { NameScreen,CurrencyScreen,OutputScreen } from './Screens';

class Main extends React.Component {
	state = {
		screen: 0,
		currency: ''
	};

	componentDidMount() {
		if(localStorage.getItem('userName')) {
			this.setState({
				screen: 1
			});
		}
	};

	headline() {
		const { screen } = this.state;
		if(screen===0) {
			return "Hi";
		}
		else if(screen===1) {
			return `Hello, ${localStorage.getItem('userName')}!`;
		}
	};

  	nameSet = event => {
  		this.setState({
  			screen: 1
  		});
  	};

  	currencySet = (currency,event) => {
  		this.setState({
  			screen: 2,
  			currency
  		});
  	};

    render () {
    	const { classes } = this.props;
        return (
        	<div className={classes.mainContent}>
        		<Typography variant="h4" className={classes.head}>
	        		{this.headline()}
	        	</Typography>
	        	<div className={classes.wrapper}>
	        	<Card className={classes.card}>
	        		{this.state.screen===0 &&
		        		<NameScreen nameSet={this.nameSet} />
	        		}
	        		{this.state.screen===1 &&
	        			<CurrencyScreen currencySet={this.currencySet} />
	        		}
	        		{this.state.screen===2 &&
	        			<OutputScreen currency={this.state.currency} goBack={this.nameSet} />
	        		}
	        	</Card>
	        	</div>
        	</div>
        );
    }
};

const styles = theme => ({
	body: {
		overflow: 'hidden',
		height: window.innerHeight, 
		width: window.innerWidth,
	},
	card: {
		marginTop: "0.5em",
		width: "60%",
		padding: "3em",
		[theme.breakpoints.down('xs')]: {
			width: "95%",
			marginTop: "0.25em",
			padding: "3em"
		},
	},
	wrapper: {
		marginTop: 45,
		[theme.breakpoints.down('md')]: {
			padding: 0
		},
		display: "flex",
		justifyContent: "center"
	}
});

export default withStyles(styles)(Main);
