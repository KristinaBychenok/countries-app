import { gql } from '@apollo/client'

export const countryCardQuery = gql`
  query getCountry($codeCountry: ID!) {
    country(code: $codeCountry) {
      code
      name
      emoji
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`
