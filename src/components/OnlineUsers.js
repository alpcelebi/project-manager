import { useCollection } from '../hooks/useCollection'

import Avatar from './Avatar'

import './OnlineUsers.css'


export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('kullanicilar')

  // console.log(documents); 
  return (
    <div className="user-list">
      <h2>Kullanıcı Listesi</h2>
      {isPending && <div>Kullanıcılar Yükleniyor...</div>} 
      {error && <div>{error}</div>}
      {documents && documents.map(k => (
        <div key={k.id} className="user-list-item">
          {k.onlie && <span className='online-user'></span>}

          <span>{k.kullaniciAd}</span>
          <Avatar src={k.fotoUrl} />
        </div>
      ))}
    </div>
  )
}
