export interface CountriesResponseType {
  countries: CountryType[]
}

export interface CountryType {
  code: string
  name: string
  emoji?: string
  continent: ContinentType
  languages?: LanguagesType[]
}

interface ContinentType {
  name: string
}

interface LanguagesType {
  name: string
}
