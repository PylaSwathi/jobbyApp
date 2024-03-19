/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import Profile from '../Profile/index'
import JobItem from '../JobItem/index'
import NoJobFound from '../NoJobFound/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    salaryRangeId: '',
    employmentTypeId: [],
    search: '',
    apiStatus: apiStatusConstants.initial,
    jobs: [],
  }

  setSearchInput = event => {
    this.setState({search: event.target.value})
  }

  getJobsApi = async () => {
    const {salaryRangeId, employmentTypeId, search} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const empType = employmentTypeId.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryRangeId}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobs = jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
      }))
      console.log(updatedJobs)
      this.setState({apiStatus: apiStatusConstants.success, jobs: updatedJobs})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setSalaryRangeId = async event => {
    const newSalaryRangeId = event.target.value
    // this.setState({salaryRangeId: event.target.value})
    //  const {salaryRangeId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?minimum_package=${newSalaryRangeId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobs = jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
      }))
      console.log(updatedJobs)
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobs: updatedJobs,
        salaryRangeId: newSalaryRangeId,
      })
    }
  }

  setEmploymentTypeId = async event => {
    console.log(event.target.checked)
    if (event.target.checked) {
      const {employmentTypeId} = this.state
      const newEmploymentTypeId = [...employmentTypeId, event.target.value]
      console.log('list', newEmploymentTypeId)

      this.setState({apiStatus: apiStatusConstants.inProgress})
      const jwtToken = Cookies.get('jwt_token')
      const empType = employmentTypeId.join(',')
      console.log('join', empType)
      const url = `https://apis.ccbp.in/jobs?employment_type=${empType}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)

      if (response.ok === true) {
        const data = await response.json()
        const {jobs} = data
        console.log('jobs', jobs)
        const updatedJobs = jobs.map(each => ({
          id: each.id,
          title: each.title,
          rating: each.rating,
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          jobDescription: each.job_description,
          packagePerAnnum: each.package_per_annum,
          location: each.location,
        }))
        console.log(updatedJobs)

        const filteredData = updatedJobs.filter(each => {
          const emp = each.employmentType
          // console.log(emp)
          const newEmp = emp.replace(' ', '')
          const upper = newEmp.toUpperCase()
          // console.log(upper)
          console.log(upper in newEmploymentTypeId)
          if (upper in newEmploymentTypeId) {
            return true
          }
          return false
        })
        console.log('filtered', filteredData)

        this.setState({
          apiStatus: apiStatusConstants.success,
          jobs: updatedJobs,
          employmentTypeId: newEmploymentTypeId,
        })
      }
    } else {
      const {employmentTypeId} = this.state
      const newEmploymentTypeId = employmentTypeId.filter(
        each => each !== event.target.id,
      )
      console.log(newEmploymentTypeId)
      this.setState({employmentTypeId: newEmploymentTypeId})
    }
  }

  searchJobs = async () => {
    this.getJobsApi()
  }

  retry = async () => {
    this.getJobsApi()
  }

  componentDidMount = async () => {
    this.getJobsApi()
  }

  render() {
    const {search, jobs, apiStatus} = this.state
    console.log('jobs', jobs)
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-left-container">
            <Profile />
            <hr className="jobs-line" />
            <h1 className="jobs-para">Type of Employment</h1>
            <ul className="jobs-list">
              {employmentTypesList.map(each => (
                <li className="jobs-list-item" key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    className="jobs-select-option"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    name={each.employmentTypeId}
                    onChange={this.setEmploymentTypeId}
                  />
                  <label className="jobs-label" htmlFor={each.employmentTypeId}>
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="jobs-line" />
            <h1 className="jobs-para">Salary Range</h1>
            <ul className="jobs-list">
              {salaryRangesList.map(each => (
                <li className="jobs-list-item" key={each.salaryRangeId}>
                  <input
                    type="radio"
                    name="salaryRange"
                    id={each.salaryRangeId}
                    value={each.salaryRangeId}
                    onChange={this.setSalaryRangeId}
                  />
                  <label className="jobs-label" htmlFor={each.salaryRangeId}>
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-right-container">
            <div className="search-bar">
              <input
                type="search"
                className="jobs-search-input"
                placeholder="search"
                value={search}
                onChange={this.setSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="jobs-search-icon"
                onClick={this.searchJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {apiStatus === apiStatusConstants.inProgress && (
              <div className="loader-container1">
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              </div>
            )}
            {apiStatus === apiStatusConstants.success && jobs.length === 0 && (
              <NoJobFound />
            )}

            {apiStatus === apiStatusConstants.success && jobs.length !== 0 && (
              <ul className="jobs-section">
                {jobs.map(each => (
                  <JobItem key={each.id} each={each} />
                ))}
              </ul>
            )}
            {apiStatus === apiStatusConstants.failure && (
              <div className="job-details-failure-bg">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                  className="job-details-failure-img"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for.</p>
                <button
                  type="button"
                  className="failure-btn"
                  onClick={this.retry}
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
