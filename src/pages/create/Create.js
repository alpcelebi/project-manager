

import './Create.css'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

export default function Create() {

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [projectUsers, setProjectUsers] = useState([])
  const [users, setUsers] = useState([])
  const [formError,setFormError]=useState(null)
  const {user}=useAuthContext();
  const {dokumanEkle,response}=useFirestore('projeler');
  const navigate=useNavigate();

  const categories = [

    { value: 'Masaüstü', label: 'Masaüsü Yazılım' },
    { value: 'Web', label: 'Web Yazılım' },
    { value: 'Mobil', label: 'Mobil Yazılım' }

  ]

  const { documents } = useCollection('kullanicilar');


  const handleSubmit =async (e) => {

    e.preventDefault();

      formError(null)

      if(!category){

        setFormError('Lütfen Kategori Seçiniz')
        return;

      }

      if(projectUsers.length<1){

        setFormError('Lütfen Proje için Kullaınıcı Seçiniz')
      }

      const olusturan={

        kullaniciAd:user.displayName,
        kullaniciFotoUrl:user.photoURL,
        id:user.id


      }

      const projeKullaniciListesi=projectUsers.map((k)=>{

        return {

          kullaniciAd:k.value.kullaniciAd,
          fotoUrl:k.value.fotoUrl,
          id:k.value.id
  }
})

    const yeniProje={

      isim:name,
      aciklama:details,
      kategori:category.value,
      bitisTarihi:new Date(date),
      yorummlar:[],
      olusturan,
      projeKullaniciListesi

    }

    await dokumanEkle(yeniProje);
    
    if(!response.error){

      navigate('/') 
    }

  }




  useEffect(() => {

    if (documents) {

      const options = documents.map(user => {

        return { value: user, label: user.kullaniciAd }

      })

      setUsers(options)

    }


  }, [documents])

  return (
    <div className='create-form'>
      <h2 className='page-title'>Yeni Bir Proje Oluşturun</h2>
      <form onSubmit={handleSubmit}>

        <label >

          <span>Proje İsmi :</span>
          <input required type="text" onChange={(e) => setName(e.target.value)} value={name} />

        </label>
        <label >

          <span>Proje Açıklaması :</span>
          <textarea required type="text" onChange={(e) => setDetails(e.target.value)} value={details}> </textarea>

        </label>

        <label >

          <span>Bitiş Tarihi :</span>
          <input required type="date" onChange={(e) => setDate(e.target.value)} value={date} />

        </label>

        <label >

          <span>Kategori :</span>
          <Select placeholder="Seçiniz" options={categories} onChange={(option) => setCategory(option)} />

        </label>

        <label >

          <span>Proje Kullanıcıları :</span>

          <Select placeholder="Proje için kullanıcı seçiniz" options={users} onChange={(option) => setProjectUsers(option)} isMulti />


        </label>


        <button className='btn'> Proje Ekle</button>

        { formError && <div className='error'>{formError}</div>}

      </form>

    </div>
  ) 
}
