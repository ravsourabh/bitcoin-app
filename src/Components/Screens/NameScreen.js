/*
  name: NameScreen
  props: gotoSecondScreen(Function): sets screen=1, navigating to CurrencyScreen
  inputs: Takes name as input validates(length<50,characters and spaces)
  work: set localStorage userName={name} after validation
*/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography,TextField,Button } from '@material-ui/core';

class NameScreen extends React.Component {
	state = {
    /*name: name entered by user
      nameValid: is name valid, ie: characters<50 and only letters and spaces.
                First assumed to be valid
    */
		name: '',
		nameValid: true
	};

	handleChange = name => event => {
    //change value of name on user text input,also set nameValid = true
		var checkType = name+"Valid";
	    this.setState({
	      [name]: event.target.value,
	      [checkType]: true
	    });
  	};

	checkName() {
      //check if name is valid, returns the result as boolean and sets nameValid as result
  		let pattern = /^[ A-Za-z]+$/;  //patter=space or alphabet
  		var isValid = pattern.test(this.state.name); //compare name with pattern
  		if(!isValid || this.state.name==='' || this.state.name.length>50) {
  			this.setState({
  				nameValid: false
  			});
  			return false;
  		}
  		return true;
  	};

  	resetName = event => {
      //reset the text field and set nameValid to true
  		event.preventDefault();
  		this.setState({
  			name: '',
  			nameValid: true
  		});
  	};

	submit = event => {
    //If valid than set localStorage item 'userName' to that name
		event.preventDefault();
		if(this.checkName()) {
			localStorage.setItem('userName', this.state.name);
			this.props.gotoSecondScreen();
		}
  };

    render () {
    	const { classes } = this.props;
        return (
        	<React.Fragment>
              <Typography variant="h6">
                <i>
                  Enter your name, only letters and spaces and maximum 50 characters
                </i>
              </Typography>
        			<form className={classes.container} noValidate>
                <div className={classes.nameFormWrap}>
    			        <TextField
    			          autoFocus
    			          error = {!this.state.nameValid}
    			          id="full-name"
    			          label="Enter Name"
    			          className={classes.textField}
                    variant="outlined"
    			          value={this.state.name}
    			          onChange={this.handleChange('name')}
    			          margin="normal"
    			        />
                </div>
                <div className={classes.actionButton}>
    			        <Button id="reset"
    			        	className={classes.button}
    			        	onClick={this.resetName.bind(this)}
    			        	type="reset" 
    			        >Reset</Button>

    			        <Button id="submit"
    			        	className={classes.button}
    			        	onClick={this.submit.bind(this)}
    			        	variant="contained"
    			        	color="primary"
    			        	type="submit"
    			        >Continue</Button>
                </div>
    			    </form>
	        </React.Fragment>
        );
    }
};

const styles = theme => ({
	nameFormWrap: {
		marginTop: "5em",
		display: 'flex',
		justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: "2em"
    },
	},
  actionButton: {
    marginTop: "1em",
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '35em'
  }
});

export default withStyles(styles)(NameScreen);
