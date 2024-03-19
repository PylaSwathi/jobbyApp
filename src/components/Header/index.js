import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  logout = () => {
    const {history} = this.props
    console.log(this.props)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-bg-container">
        <Link to="/" className="link">
          {' '}
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <ul className="header-list">
          <li className="header-list-item">
            <Link to="/" className="link">
              {' '}
              Home
            </Link>
          </li>
          <li className="header-list-item">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="header-logout-btn"
              onClick={this.logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Header)
