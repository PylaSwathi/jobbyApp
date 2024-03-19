import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'

import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarItem = props => {
  const {each} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = each
  return (
    <li className="similar-job-container">
      <div className="job-item-logo-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="similar-item-head">Description</h1>
      <p className="similar-item-para">{jobDescription}</p>
      <div className="similar-job-location-section">
        <FaMapMarkerAlt className="similar-job-item-location-item" />
        <p className="similar-job-item-location-name">{location}</p>
        <BsBriefcaseFill className="similar-job-item-location-item" />
        <p className="similar-job-item-location-name">{employmentType}</p>
        <p className="similar-job-item-package">{packagePerAnnum}</p>
      </div>
    </li>
  )
}

export default SimilarItem
