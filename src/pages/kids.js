import React from 'react'
import { Link, graphql } from 'gatsby'

export const query = graphql`
  query Kids {
    kids: allKid {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`

const Kids = ({ data: { kids } }) => (
  <div>
    <h1>Gatsby schema customization example</h1>
    <p>
      <Link to="/">Back to home</Link>
    </p>
    <h2>List of kids</h2>
    <ul>
      {kids.nodes.map((kid) => (
        <li key={kid.id}>{`${kid.firstName} ${kid.lastName}`}</li>
      ))}
    </ul>
  </div>
)

export default Kids
