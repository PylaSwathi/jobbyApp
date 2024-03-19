import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {each} = props
  const {
    id,
    title,
    location,
    companyLogoUrl,
    rating,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item-container">
        <div className="job-item-logo-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-logo"
          />
          <div className="job-names-section">
            <h1 className="job-name">{title}</h1>
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
          <p className="job-item-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-item-line" />
        <h1 className="job-item-description">Description</h1>
        <p className="job-item-desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
