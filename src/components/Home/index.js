import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header/index'
import './index.css'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="head-content">
            <h1 className="home-head">Find the job that fits your life.</h1>
            <p className="home-para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link-btn">
              {' '}
              <button type="button" className="home-jobs-btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
