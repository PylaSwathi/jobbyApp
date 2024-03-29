import './index.css'

const NotFound = () => {
  console.log('Not-found')

  return (
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  )
}

export default NotFound
