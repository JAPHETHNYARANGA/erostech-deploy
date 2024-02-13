import React from 'react';
import NavBar from './components/navigation/Navbar';
import { Outlet } from 'react-router-dom';

export default function WithNav() {
 return (
    <>
      <NavBar />
      <Outlet />
    </>
 );
};