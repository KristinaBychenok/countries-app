import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CountriesPage } from './pages/CountriesPage'
import { CountryCardPage } from './pages/CountryCardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/:code" element={<CountryCardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
