// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// eslint-disable-next-line react/prop-types
export default function Layout({children}) {
  return (
    <div>
        <Navbar/>
        <div className='content'>{children}</div>
        <Footer/>
    </div>
    
  )
}
