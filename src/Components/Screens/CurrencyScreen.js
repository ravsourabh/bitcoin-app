/*
  name: CurrencyScreen
  props: currencySet(Function): sets screen=2 and currency
  inputs: Takes input of currency short code, example, GBP,USD,etc
  work: search currency and call currencySet(currency) to set the currency
*/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography,Button } from '@material-ui/core';
import Autosuggest from 'react-autosuggest';
import './CurrencyScreen.css';

//all available currency shortcodes for the app
const currencies = [
                      'USD', 'INR', 'GBP',
                      'BYN', 'CAD', 'HRK',
                      'AUD', 'BRL', 'CNY',
                      'DKK', 'EGP', 'GHS',
                      'HKD', 'JPY', 'LRD',
                      'MXN', 'NAD', 'NPR',
                      'NZD', 'PKR', 'QAR',
                  ];

//this is used to determine the suggestions of search bar
const getSuggestions = currency => {
  const inputValue = currency.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : currencies.filter(currency =>
    currency.toLowerCase().slice(0, inputLength) === inputValue
  );
};

//when suggestion is clicked, to what the currency value to be set
const getSuggestionValue = suggestion => suggestion;

//display of the currency suggestion
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class CurrencyScreen extends React.Component {
	state = {
    currency: '',   //can be USD,INR,GBP,etc
    suggestions: [],  //stores the suggestion, depending on user input
    error: false  //error based on whether or not invalid/empty currency entered
	};

	onChange = (event, { newValue }) => {
    //change the currency value based on value of textfield
    this.setState({
      currency: newValue,
      error: false  //always assume no error on change of input
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    //get suggestion based on previous set function component
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    //on clear of suggestions
    this.setState({
      suggestions: []
    });
  };

  resetCurrency = event => {
    //on reset click, set suggestions to empty array and set currency as empty string
    this.setState({
      suggestions: [],
      currency: ''
    });
  };

  checkCurrency = event => {
    //validate currency, give error if currency empty or anything that is not in the currencies array
    if(this.state.currency==='' || !currencies.includes(this.state.currency))
      return false;
    else
      return true;
  };

  submit = event => {
      //on submit check if currency is valid and call currencySet passing the value of currency
      //if currency is invalid than set error to true, which will than display error message
      event.preventDefault();
      if(!this.checkCurrency()) {
        this.setState({
          error: true
        });
      }
      else
        this.props.currencySet(this.state.currency,this);
  };

  render () {
  	const { classes } = this.props;
    const { currency, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Enter currency',
      value: currency,
      onChange: this.onChange
    };

    return (
    	<React.Fragment>
        <Typography variant="h6">
          <i>
            Which currency you want to convert to, from today's Bitcoin value?
          </i>
        </Typography>
        <form noValidate>
          <div className={classes.currencyInput}>
        		<Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          {!this.state.error &&
            <Typography color="primary" className={classes.error} variant="caption">
              Search short codes, like: USD, INR, etc
            </Typography>
          }
          {this.state.error &&
            <Typography color="error" className={classes.error} variant="caption">
              Invalid currecy selected
            </Typography>
          }
          <div className={classes.actionButton}>
            <Button id="reset"
                className={classes.button}
                onClick={this.resetCurrency.bind(this)}
                type="reset" 
              >
              Reset
            </Button>
            <Button id="submit"
                className={classes.button}
                onClick={this.submit.bind(this)}
                variant="contained"
                color="primary"
                type="submit"
              >
              Find
            </Button>
          </div>
        </form>
      </React.Fragment>
    );
  }
};

const styles = theme => ({
  currencyInput: {
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
  },
  error: {
    display: 'flex',
    justifyContent: 'center'
  }
});

export default withStyles(styles)(CurrencyScreen);
