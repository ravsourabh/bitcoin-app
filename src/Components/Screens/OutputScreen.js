import React from 'react';
import axios from 'axios';
import ifvisible from 'ifvisible.js';

class OutputScreen extends React.Component {
  state = {
    value: ''
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
      console.log(error);
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
    return(
      <h1>
        {this.state.value}
      </h1>
    );
  }

}

export default OutputScreen;