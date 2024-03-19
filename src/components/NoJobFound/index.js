import './index.css'

const NoJobFound = () => (
  <div className="no-job-found-section">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
      className="no-job-image"
    />
    <h1>No Jobs Found</h1>
    <p>We could not find any jobs. Try other filters</p>
  </div>
)

export default NoJobFound
