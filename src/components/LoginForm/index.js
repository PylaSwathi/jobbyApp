import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onsubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onsubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="login-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-logo"
            alt="website logo"
          />
          <label className="login-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            className="login-username-input"
            id="username"
            onChange={this.onChangeUserName}
            value={username}
          />
          <label className="login-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            className="login-username-password"
            id="password"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="login-error">{`*${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
