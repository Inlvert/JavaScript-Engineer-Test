import React from 'react'
import Header from '../../components/Header'
import SuperheroList from '../../components/SuperheroList'

const HomePage = () => {
  return (
    <div style={{backgroundColor: "#242424", height: "100vh"}}>
      <Header/>
      <SuperheroList />
    </div>
  )
}

export default HomePage