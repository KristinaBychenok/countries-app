import { gql } from '@apollo/client'

export const countriesQuery = gql`
  query {
    countries(filter: {}) {
      code
      name
      continent {
        name
      }
      languages {
        name
      }
      emoji
    }
  }
`
