// Sidebar.js

import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <Avatar src={user?.photoURL} />
          <p>Merhaba {user?.displayName}</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <span>Yeni Proje</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}