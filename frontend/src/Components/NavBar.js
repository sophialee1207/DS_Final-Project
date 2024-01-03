import React, { useState } from 'react';
import "./NavBar.css"
import Navbar from 'react-bootstrap/Navbar';
import Clock from './Clock';

const NavBar = ({ userName }) => {
  return (
    <Navbar bg="dark" variant="dark" className='justify-content-between p-2'>
      <h5 className="text-white" style={{ margin: 0 }}>Fluentd Demo</h5>
      {userName && <div className="text-white ml-auto large-font">Hi <a className='userName'>{userName}</a></div>}
      <Clock />
    </Navbar>
  )
}

export default NavBar