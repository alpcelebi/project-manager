// Avatar.js

import React from 'react';
import './Avatar.css';

// src prop'unu alacak şekilde bileşeni güncelle
export default function Avatar({ src }) {
  return (
    <div className='avatar'>
      <img src={src} alt='avatar' />
    </div>
  );
}