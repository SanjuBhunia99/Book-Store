import React from 'react'
import Navbar from '../components/Navbar.jsx';
import Course from '../components/Course.jsx';
import Footer from '../components/Footer.jsx';
import Contact from '../components/Contact.jsx';

const Courses = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Course />
          </div>
      <Footer />
      <Contact/>

    </>
  );
}

export default Courses
