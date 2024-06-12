import React from 'react';
import './App.css';
import { Navbar } from './Layouts/NavAndFooter/NavBar';
import { Footer } from './Layouts/NavAndFooter/Footer';
import { Home } from './Layouts/HomePage/Home';
import { SearchPartsPage} from './Layouts/SearchPartsPage/SearchPartsPage'

function App() {
  return ( 
    <div className='d-flex flex-column min-vh-100'>
      <Navbar/>
      <div className='flex-grow-1'>
        {/* <Home/> */}
        <SearchPartsPage/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
