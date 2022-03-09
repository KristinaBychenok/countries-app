import { useParams } from 'react-router-dom'
import { CountryCard } from '../components/CountryCard/CountryCard'

export const CountryCardPage = () => {
  const { code } = useParams()

  return <CountryCard code={code} />
}
