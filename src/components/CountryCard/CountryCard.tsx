import { useQuery } from '@apollo/client'
import { CountryCardResponseType } from '../../types/CountryCardResponseType'
import { countryCardQuery } from '../../query/countryCardQuery'

import classes from './CountryCard.module.css'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

export const CountryCard = (props: { code?: string }) => {
  const { loading, error, data } = useQuery<CountryCardResponseType>(
    countryCardQuery,
    {
      variables: { codeCountry: props.code?.toUpperCase() },
    }
  )

  if (loading)
    return (
      <div className={classes.spiner}>
        <ClipLoader loading={loading} size={35} />
      </div>
    )
  if (error) return <p>Error</p>

  return (
    <div className={classes.card_container}>
      <h2 className={classes.card_title}>
        {data?.country.name}
        <span className={classes.emoji}>{data?.country.emoji}</span>
      </h2>
      <p className={classes.inf}>{`Code: ${data?.country.code}`}</p>
      <p
        className={classes.inf}
      >{`Continent: ${data?.country.continent.name}`}</p>
      <p className={classes.inf}>{`Language(s): ${data?.country.languages?.map(
        (lang) => lang.name
      )}`}</p>
      <Link to={'/'} className={classes.back_button}>
        Back
      </Link>
    </div>
  )
}
