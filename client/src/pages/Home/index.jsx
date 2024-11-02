import React from 'react'
import Header from '../../components/Header'
import SuperheroList from '../../components/SuperheroList'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <h1>HomePage</h1>
      <SuperheroList />
    </div>
  )
}

export default HomePage