import React from 'react'
import { Link } from 'gatsby'

const Home = () => (
  <div>
    <h1>Gatsby schema customization example</h1>
    <p>
      <Link to="/ancestors">List of ancestors</Link>
    </p>
    <p>
      <Link to="/descendants">List of descendants</Link>
    </p>
  </div>
)

export default Home
