/*
  name: OutputScreen
  props: goBack(Function): sets screen=1, currency(Value): currency to be converted to, INR,USD,etc
  api: fetch value of bitcoin in currency using a api
  work: initially display the value of 1 bitcoin in {currency}
  additionalFunctionality: change BTC of {currency} and get other value accorgingly
                          refresh the screen to get latest value of BTC
*/
import React from 'react';
import axios from 'axios';
import ifvisible from 'ifvisible.js';
import { withStyles } from '@material-ui/core/styles';
import { Typography,TextField,Button,Snackbar,IconButton,CircularProgress,InputAdornment } from '@material-ui/core';

class OutputScreen extends React.Component {
  state = {
    value: '',  //value is the value of 1BTC in {currency}
    error: false, //error occured while loading from api
    errorSnackbar: false,

    process: false,  //is the fetch func running
    initialProcess: true,  //is the fetch func running for first time

    bitcoinValue: 1,  //value in bitcoin
    currencyValue: 1  //value in {currency}
  };

  componentDidMount() {
    this.fetch(); //fetch for first time
    this.setState({
      initialProcess: false  //after first fetch set
    });
    this.interval = setInterval(() => this.checkIfMinimised(), 1000); //run check for minimization every one second
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  handleClose = event => {
    //close error snackbar
    this.setState({
      errorSnackbar: false
    });
  };

  handleChange = name => event => {
    //change value of currency and get other currency value
    const {value} = this.state; //conversion based on value fetched
    if(name==='currencyValue') { //if currencyValue changed by user than calculated new bitcoinValue and update both
      var bValue = event.target.value/value;
      this.setState({
        bitcoinValue: bValue,
        currencyValue: event.target.value
      });
    }
    else if(name==='bitcoinValue') {
    //if bitcoinValue changed than calculated new currencyValue and update both
      var cValue = event.target.value*value;
      this.setState({
        currencyValue: cValue,
        bitcoinValue: event.target.value
      });
    }
  };

  fetch() {
    //fetches the value of btc in {currency}
    if(this.state.process && !this.state.initialProcess)
      return; //return if refresh clicked more than one time without finishing first api fetch
    this.setState({
      process: true  //fetch is under process
    });
    var self = this;
    axios({
      method: 'get',
      url: `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${this.props.currency}&amount=1`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        'X-ba-key': 'MTVmMzdjYzI0NDAyNGUwNzlmYmFiYmQwYzg0MzY5NWI'
      },
    })
    .then(function (response) {
      self.setState({
        value: response.data.price, //value from api fetch
        bitcoinValue: 1,
        currencyValue: response.data.price,
        error: false  //if refreshed after error, this will notify that no more error
      });
    })
    .catch(function (error) {
      self.setState({
        error: true,
        errorSnackbar: true
      });
    })
    .then(function () {
      self.setState({
        process: false
      });
    });
  }

  checkIfMinimised() {
    //using package ifVisible, check if hidden
    //uses prop function goBack if minimised
    if(ifvisible.now('hidden')){
      this.props.goBack();
    }
  };

  render() {
    const {classes} = this.props;

    return(
      <React.Fragment>
              <div className={classes.cardHeader}>
                <Typography variant="h6">
                  <i>
                    BTC to {this.props.currency} conversion
                  </i>
                </Typography>
                <Button id="reset"
                  className={classes.button}
                  onClick={this.fetch.bind(this)}
                >Refresh</Button>
              </div>
              {this.state.process &&
                <div className={classes.process}>
                  <CircularProgress />
                </div>
              }
              {this.state.error &&
                <Typography variant="h6" className={classes.error}>
                  Some error occured
                </Typography>
              }
              {(!this.state.process && !this.state.error) &&
              <div className={classes.convertWrap}>
                <TextField
                    autoFocus
                    id="btc"
                    label="Bitcoin"
                    className={classes.bitcoin}
                    type="number"
                    variant="outlined"
                    value={this.state.bitcoinValue}
                    onChange={this.handleChange('bitcoinValue')}
                    margin="normal"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">BTC</InputAdornment>,
                    }}
                />
                <Typography variant="h3" className={classes.equals}>
                  =
                </Typography>
                <TextField
                    id="cur"
                    label={this.props.currency}
                    className={classes.cur}
                    type="number"
                    variant="outlined"
                    value={this.state.currencyValue}
                    onChange={this.handleChange('currencyValue')}
                    margin="normal"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{this.props.currency}</InputAdornment>,
                    }}
                />
              </div>
              }
              <Snackbar
                  className={classes.error}
                  message="Some error occured"
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleClose}
                    >
                      x
                    </IconButton>,
                  ]}
                  open={this.state.errorSnackbar}
                  autoHideDuration={4000}
                  onClose={this.handleClose}
                />
          </React.Fragment>
    );
  }
}

const styles = theme => ({
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  convertWrap: {
    marginTop: "3em",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  process: {
    display: "flex",
    justifyContent: "center",
    marginTop: '3em'
  },
  equals: {
    display: 'flex',
    justifyContent: 'center'
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3em'
  }
});

export default withStyles(styles)(OutputScreen);