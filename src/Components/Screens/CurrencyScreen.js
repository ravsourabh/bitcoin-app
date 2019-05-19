import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card,Typography,TextField,Button } from '@material-ui/core';
import Autosuggest from 'react-autosuggest';
import './CurrencyScreen.css';

const currencies = [
                      'USD', 'INR', 'GBP',
                      'BYN', 'CAD', 'HRK',
                      'AUD', 'BRL', 'CNY',
                      'DKK', 'EGP', 'GHS',
                      'HKD', 'JPY', 'LRD',
                      'MXN', 'NAD', 'NPR',
                      'NZD', 'PKR', 'QAR',
                  ];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : currencies.filter(currency =>
    currency.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion;


const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class CurrencyScreen extends React.Component {
	state = {
    value: '',
    suggestions: [],
	};

	onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  resetCurrency = event => {
    this.setState({
      suggestions: [],
      value: ''
    });
  };

  render () {
  	const { classes } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Enter currency',
      value,
      onChange: this.onChange
    };

    return (
    	<React.Fragment>
        <Typography variant="h6">
          <i>
            Which currency to convert from today's Bitcoin value?
          </i>
        </Typography>
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

          <div className={classes.actionButton}>
            <Button id="reset"
                className={classes.button}
                onClick={this.resetCurrency}
                type="reset" 
              >
              Reset
            </Button>
            <Button id="submit"
                className={classes.button}
                onClick={this.props.currencySet.bind(this,value)}
                variant="contained"
                color="primary"
                type="submit"
              >
              Find
            </Button>
          </div>
      </React.Fragment>
    );
  }
};

const styles = theme => ({
  currencyInput: {
    marginTop: "1em",
    display: 'flex',
    justifyContent: 'center'
  },
  actionButton: {
    marginTop: "1em",
    display: 'flex',
    justifyContent: 'space-around'
  }
});

export default withStyles(styles)(CurrencyScreen);
