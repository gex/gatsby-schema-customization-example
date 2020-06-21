import React from 'react'
import { Link, graphql } from 'gatsby'

export const query = graphql`
  query Parents {
    parents: allParent {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`

const Parents = ({ data: { parents } }) => (
  <div>
    <h1>Gatsby schema customization example</h1>
    <p>
      <Link to="/">Back to home</Link>
    </p>
    <h2>List of parents</h2>
    <ul>
      {parents.nodes.map((parent) => (
        <li key={parent.id}>{`${parent.firstName} ${parent.lastName}`}</li>
      ))}
    </ul>
  </div>
)

export default Parents
