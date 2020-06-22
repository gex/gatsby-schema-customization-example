import React from 'react'
import { Link, graphql } from 'gatsby'

export const query = graphql`
  query Ancestors {
    ancestors: allAncestor {
      nodes {
        id
        firstName
        lastName
        descendants {
          id
          firstName
          lastName
        }
      }
    }
  }
`

const Ancestors = ({ data: { ancestors } }) => (
  <div>
    <h1>Gatsby schema customization example</h1>
    <p>
      <Link to="/">Back to home</Link>
    </p>
    <h2>List of ancestors</h2>
    <ul>
      {ancestors.nodes.map((ancestor) => (
        <li key={ancestor.id}>
          <strong>{`${ancestor.firstName} ${ancestor.lastName}`}</strong>{' '}
          (descendants:{' '}
          {ancestor.descendants
            .map(
              (descendant) => `${descendant.firstName} ${descendant.lastName}`
            )
            .join(', ')}
          )
        </li>
      ))}
    </ul>
  </div>
)

export default Ancestors
