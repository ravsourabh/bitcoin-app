import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card,Typography,TextField,Button } from '@material-ui/core';

class NameScreen extends React.Component {
	state = {
		name: '',
		nameValid: true
	};

	handleChange = name => event => {
		var checkType = name+"Valid";
	    this.setState({
	      [name]: event.target.value,
	      [checkType]: true
	    });
  	};

	checkName() {
  		let re = /^[ A-Za-z]+$/;
  		var isValid = re.test(this.state.name);
  		if(!isValid || this.state.name==='' || this.state.name.length>50) {
  			this.setState({
  				nameValid: false
  			});
  			return false;
  		}
  		return true;
  	};

  	resetName = event => {
  		event.preventDefault();
  		this.setState({
  			name: '',
  			nameValid: true
  		});
  	};

	submit = event => {
  		event.preventDefault();
  		if(this.checkName()) {
  			console.log(true);
  			localStorage.setItem('userName', this.state.name);
  			this.props.nameSet();
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
        			<form className={classes.container} noValidate autoComplete="off">
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
		marginTop: "3em",
		display: 'flex',
		justifyContent: 'center'
	},
  actionButton: {
    marginTop: "1em",
    display: 'flex',
    justifyContent: 'space-between',
    width: '35em'
  }
});

export default withStyles(styles)(NameScreen);
