import React from 'react'
import { Link } from 'gatsby'

const Home = () => (
  <div>
    <h1>Gatsby schema customization example</h1>
    <p>
      <Link to="/parents">List of parents</Link>
    </p>
    <p>
      <Link to="/kids">List of kids</Link>
    </p>
  </div>
)

export default Home
