import './ProjectList.css'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'


export default function ProjectList({projeler}) {


  return (
    <div className='project-list'>
        {projeler.length===0 &&

        <p>Henüz Proje Eklenmedi</p>    


        }

        {projeler.map(proje=>(

            <Link to={`/projects/${proje.id} `} key={proje.id}> 

                <h4>{proje.isim}</h4>
                <p>{proje.bitisTarihi.toDate().toLocaleString('tr-TR',
                {
                    weekday:'long' ,
                    year: 'numeric',
                    month:'long',
                    day:'numeric'


                })}</p>

                <div className='project-user'>

                   <ul>
                        {proje.projeKullaniciListesi.map(k=>(

                            <li key={k.fotoUrl}>    

                                <Avatar src={k.fotoUrl} />
                                

                            </li>
                        ))}
                    
                    </ul> 

               </div>

            
            </Link>

        ))}

    </div>
  )
}
