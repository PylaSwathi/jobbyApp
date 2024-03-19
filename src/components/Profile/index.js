import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({apiStatus: apiStatusConstants.success, profileDetails})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getProfileDetails()
  }

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-bg-container">
        <img
          src={profileDetails.profileImageUrl}
          className="profile-img"
          alt="profile"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-short-bio">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-bg">
      <button
        type="button"
        className="profile-failure-btn"
        onClick={this.retry}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Profile
