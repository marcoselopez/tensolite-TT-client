import React from 'react'
import { Link } from 'react-router-dom'
import './notFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
        404 - NOT FOUND
        <p>Sorry, but we couldn't locate the resource you're trying to reach. </p>
        <p>You can go back to the main page clicking <Link to="/">here</Link>.</p>
    </div>
  )
}

export default NotFound