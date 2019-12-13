import React from 'react'
import SimForm from './components/SimForm'
import FamilyForm from './components/FamilyForm'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <FamilyForm />
      <SimForm />
      <Header/>
      <Home />
      <Footer />
     
    </div>
  )
}

export default App
