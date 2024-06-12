import React from 'react';
import './App.css';
import { Navbar } from './Layouts/NavAndFooter/NavBar';
import { Footer } from './Layouts/NavAndFooter/Footer';
import { Home } from './Layouts/HomePage/Home';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SearchPartsPage} from './Layouts/SearchPartsPage/SearchPartsPage'

export const App = () => {
  return ( 
    <div className='d-flex flex-column min-vh-100'>
      <Navbar/>
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home'/>
          </Route>

          <Route path='/home'>
            <Home/>
          </Route>

          <Route path='/search'>
          <SearchPartsPage/>
          </Route>

        </Switch>
      </div>
      <Footer/>
    </div>
  );
}

