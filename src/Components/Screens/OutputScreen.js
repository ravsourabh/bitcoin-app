import React from 'react';
import axios from 'axios';
import ifvisible from 'ifvisible.js';
import { withStyles } from '@material-ui/core/styles';
import { Card,Typography,TextField,Button,Snackbar,IconButton } from '@material-ui/core';


class OutputScreen extends React.Component {
  state = {
    value: '',
    error: false
  };

  handleClose = event => {
    this.setState({
      error: true
    });
  };

  componentDidMount() {
    var self = this;
    console.log(this.props.currency)
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
        value: response.data.price
      });
    })
    .catch(function (error) {
      self.setState({
        error: true
      });
    });
    this.interval = setInterval(() => this.checkMinimised(), 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  checkMinimised = event => {
    if(ifvisible.now('hidden')){
      this.props.goBack();
    }
  };

  render() {
    const {classes} = this.props;

    return(
      <React.Fragment>
              <Typography variant="h6">
                <i>
                  Bitcoin conversion rate
                </i>
              </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <div className={classes.convertWrap}>
                  {this.state.value}
                </div>
                <div className={classes.actionButton}>
                  
                </div>
              </form>
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
                  open={this.state.error}
                  autoHideDuration={600}
                  onClose={this.handleClose}
                />
          </React.Fragment>
    );
  }
}

const styles = theme => ({
  convertWrap: {
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

export default withStyles(styles)(OutputScreen);