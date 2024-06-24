import React from 'react';
import { Link } from 'react-router-dom'

export const Footer = () => {
    return(
        <div className='main-color'>
            <footer className='container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color'>
                    <p className='col-md-4 mb-0 text-white'>© CompanyName, Inc</p>
                    <ul className='nav navbar-dark col-md-4 justify-content-end'>
                        <li className='nav-item'>
                            <Link className='nav-link px-2 text-white' to="/">Search Machine Parts</Link>
                        </li>
                    </ul>
            </footer>
        </div>
    )
}