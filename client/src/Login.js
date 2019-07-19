import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      response: null
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then( result => {
      if (result.data.hasOwnProperty('error')) {
        this.setState({
          response: result.data
        })
      } else {
        localStorage.setItem('mernToken', result.data.token)
        this.props.liftToken(result.data);
        this.setState({
          response: null,
        })
      }
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.response ? this.state.response.message : ''}</p>
        <form onSubmit={this.handleSubmit}>
          Email: <input type="email" 
                        value={this.state.email} 
                        onChange={this.handleEmailChange}
                  /> <br />
          Password: <input type="password" 
                           value={this.state.password} 
                           onChange={this.handlePasswordChange}
                    />
          <input type="submit" value="Log In"/>
        </form>
      </div>
    )
  }
}

export default Login