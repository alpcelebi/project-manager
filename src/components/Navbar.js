// Navbar.js

import { Link } from "react-router-dom";
import './Navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const { logout , isPending} = useLogout();
  const { user } = useAuthContext(); // Auth durumunu alın

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <Link to='/'>CELEBİ Proje-Yönetim</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to='/login'>Giriş</Link>
            </li>
            <li>
              <Link to='/signup'>Üye Ol</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && <button className='logout-btn' onClick={logout}>Çıkış</button>}
            {isPending && <button className="btn" disabled>Çıkış Yapılıyor</button>}
          </li>
        )}
      </ul>
    </div>
  );
}
