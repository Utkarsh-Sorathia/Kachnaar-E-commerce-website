import React from 'react'
import { Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Link to='/' class="btn btn-outline-success">Sign-in</Link>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default Layout
