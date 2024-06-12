import React from 'react';
import CompanyLogo from '../../Images/CompanyLogo.png';

export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>
                    <img src={CompanyLogo} alt="Company Logo" style={{ width: '30px', marginRight: '10px' }} />
                    Maintenance Manage System
                </span>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>
                                <i className="bi bi-house"></i> Home
                            </a>
                        </li>
                        <li>
                            <a className='nav-link' href='#'>
                                <i className="bi bi-wrench"></i> Search Machine Parts
                            </a>
                        </li>
                    </ul>
                    {/* <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <a type='button' className='btn btn-outline-light' href='#'>Sign in</a>
                        </li>
                    </ul> */}
                </div>
            </div>
        </nav>
    )
}
