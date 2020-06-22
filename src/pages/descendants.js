import React from 'react'
import { Link, graphql } from 'gatsby'

export const query = graphql`
  query Descendants {
    descendants: allDescendant {
      nodes {
        id
        firstName
        lastName
        ancestor {
          id
          firstName
          lastName
        }
      }
    }
  }
`

const Descendants = ({ data: { descendants } }) => (
  <div>
    <h1>Gatsby schema customization example</h1>
    <p>
      <Link to="/">Back to home</Link>
    </p>
    <h2>List of descendants</h2>
    <ul>
      {descendants.nodes.map((descendant) => (
        <li key={descendant.id}>
          <strong>{`${descendant.firstName} ${descendant.lastName}`}</strong>{' '}
          (ancestor:{' '}
          {`${descendant.ancestor.firstName} ${descendant.ancestor.lastName}`})
        </li>
      ))}
    </ul>
  </div>
)

export default Descendants
