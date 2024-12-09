import React from 'react'

import ContentArea from '../Components/ContentArea'
import Sidebar from '../Components/Sidebar'
import NavbarArea from '../Components/NavbarArea'

const Home = () => {
  return (
    <div>
    <NavbarArea/>
    <Sidebar/>
    <ContentArea/>
    </div>
  )
}

export default Home