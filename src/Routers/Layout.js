import React from 'react'
import { Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <button type="button" class="btn btn-outline-success"><Link to='/'>Sign-in</Link></button>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default Layout
