import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Select, { SingleValue } from 'react-select'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { countriesQuery } from '../../query/countriesQuery'
import {
  CountriesResponseType,
  CountryType,
} from '../../types/CountriesResponseType'
import { ContinentsType, OptionsType } from '../../types/ContinentsType'

import classes from './Countries.module.css'

export function Countries() {
  const [selectedContinent, setSelectedContinent] = useState('')
  const [inputCountryName, setInputCountryName] = useState('')
  const [filteredData, setFilteredData] = useState<CountryType[]>([])

  const { loading, error, data } =
    useQuery<CountriesResponseType>(countriesQuery)

  useEffect(() => {
    if (data) {
      setFilteredData(data.countries)
    }
  }, [data])

  useEffect(() => {
    if (data?.countries) {
      const newFiltredData = data?.countries.filter(({ name, continent }) => {
        return (
          name.match(new RegExp(inputCountryName, 'i')) &&
          continent.name.match(new RegExp(selectedContinent, 'i'))
        )
      })
      setFilteredData(newFiltredData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContinent, inputCountryName])

  if (loading)
    return (
      <div className={classes.spiner}>
        <ClipLoader loading={loading} size={35} />
      </div>
    )
  if (error) return <p>Error</p>

  const selectChangeHandler = (option: SingleValue<OptionsType>) => {
    setSelectedContinent(option?.value || '')
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCountryName(event.target?.value)
  }

  const options = [
    { value: ContinentsType.Africa, label: ContinentsType.Africa },
    { value: ContinentsType.Antarctica, label: ContinentsType.Antarctica },
    { value: ContinentsType.Asia, label: ContinentsType.Asia },
    { value: ContinentsType.Europe, label: ContinentsType.Europe },
    { value: ContinentsType.NorthAmerica, label: ContinentsType.NorthAmerica },
    { value: ContinentsType.Oceania, label: ContinentsType.Oceania },
    { value: ContinentsType.SouthAmerica, label: ContinentsType.SouthAmerica },
  ] as OptionsType[]

  return (
    <div>
      <h1 className={classes.title}>Countries</h1>
      <div className={classes.filters_container}>
        <label htmlFor="country-name"></label>
        <input
          id="country-name"
          value={inputCountryName}
          placeholder="Enter country name"
          onChange={inputChangeHandler}
        ></input>
        <Select
          options={options}
          isClearable={true}
          closeMenuOnSelect={true}
          placeholder="Choose continent . . ."
          onChange={selectChangeHandler}
        />
      </div>
      <ul className={classes.countries_list}>
        {filteredData?.map(({ code, name, continent }) => (
          <li className={classes.country_item} key={code + name}>
            <p>{`${name} (${code}) - ${continent.name}`}</p>
            <Link to={code.toLowerCase()} className={classes.link}>
              Show more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
