import {Component} from 'react'
import Cookies from 'js-cookie'
// eslint-disable-next-line import/no-extraneous-dependencies
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiExternalLink} from 'react-icons/hi'
import Header from '../Header/index'
import SkillItem from '../SkillItem/index'
import SimilarItem from '../SimilarItem/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log('resp', response)
    if (response.ok === true) {
      const data = await response.json()
      console.log('data', data)
      const each = data.job_details
      const updatedJobDetails = {
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        companyWebsiteUrl: each.company_website_url,
        lifeAtCompany: each.life_at_company,
        skills: each.skills,
      }
      const sk = updatedJobDetails.skills
      const updatedSk = sk.map(each2 => ({
        name: each2.name,
        imageUrl: each2.image_url,
      }))
      const lf = updatedJobDetails.lifeAtCompany
      const updatedLifeAtCompany = {
        description: lf.description,
        imageUrl: lf.image_url,
      }

      console.log(updatedLifeAtCompany)
      updatedJobDetails.skills = updatedSk
      updatedJobDetails.lifeAtCompany = updatedLifeAtCompany
      console.log(updatedJobDetails)
      const similarJobs = data.similar_jobs
      const updatedSimilarJobs = similarJobs.map(each1 => ({
        id: each1.id,
        title: each1.title,
        rating: each1.rating,
        companyLogoUrl: each1.company_logo_url,
        employmentType: each1.employment_type,
        jobDescription: each1.job_description,
        packagePerAnnum: each1.package_per_annum,
        location: each1.location,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = async () => {
    this.componentDidMount()
  }

  render() {
    const {jobDetails, similarJobs, apiStatus} = this.state
    const {
      title,
      rating,
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
      location,
      skills,
      lifeAtCompany,
    } = jobDetails

    console.log('s', skills)

    return (
      <>
        <Header />
        {apiStatus === apiStatusConstants.inProgress && (
          <div className="job-details-bg-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        )}
        {apiStatus === apiStatusConstants.success && (
          <div className="job-details-bg-container">
            <div className="job-details-container">
              <div className="job-item-logo-section">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="job-item-logo"
                />

                <div className="job-names-section">
                  <p className="job-name">{title}</p>
                  <div className="job-name-rating">
                    <FaStar className="job-item-icon" />
                    <p className="job-item-rating-size">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="job-location-section">
                <FaMapMarkerAlt className="job-item-location-item" />
                <p className="job-item-location-name">{location}</p>
                <BsBriefcaseFill className="job-item-location-item" />
                <p className="job-item-location-name">{employmentType}</p>
                <p className="job-item-package mar">{packagePerAnnum}</p>
              </div>
              <hr className="job-item-line" />
              <div className="job-details-desc-container">
                <h1 className="job-details-description">Description</h1>

                <a href={companyWebsiteUrl} className="anchor-div">
                  <p className="anchor-link">Visit</p>
                  <HiExternalLink className="anchor-logo" />
                </a>
              </div>

              <p className="job-details-desc">{jobDescription}</p>
              <h1 className="job-details-head">Skills</h1>
              <ul className="skills-container">
                {skills &&
                  skills.map(each3 => (
                    <SkillItem each={each3} key={uuidv4()} />
                  ))}
              </ul>
              <h1 className="job-details-head">Life at Company</h1>
              <div className="job-detail-life-cont">
                <p className="job-detail-para">{lifeAtCompany.description}</p>
                <img src={lifeAtCompany.imageUrl} alt="life at company" />
              </div>
            </div>
            <h1 className="head">Similar Jobs</h1>
            <ul className="similar-jobs-details-container">
              {similarJobs.map(each => (
                <SimilarItem each={each} key={uuidv4()} />
              ))}
            </ul>
          </div>
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
            <button type="button" className="failure-btn" onClick={this.retry}>
              Retry
            </button>
          </div>
        )}
      </>
    )
  }
}

export default JobDetails
