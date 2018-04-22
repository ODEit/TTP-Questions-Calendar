import React from 'react'
import {connect} from 'react-redux'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className = 'headerFlex'>
    <h1>Calendar</h1>
    <img src = '/trees-svg.png'></img>
    </div>
    <hr />
  </div>
)


export default Navbar
