import React from 'react';
import './HeaderStyle.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';
export default function Header() {


    return (
        <header className='header'>
            <div className='header-cont'>
                <div><Link to={'/'}>Social Logo</Link></div>
                <div className='search-cont'>
                    <div className='search-field'>
                        <i className="bi bi-search"></i>
                        <input placeholder='Search'></input>
                    </div>
                </div>
                <div className='profile-cont'>my Profile info, notification</div>
            </div>
        </header>
    );
};
