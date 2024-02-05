
import './Project.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import {useDocument} from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComment from './ProjectComment'


export default function Project() {

  const {id}=useParams();
  const {error,document}=useDocument('projeler',id);

  if(error){

    return <div className='error' > {error} </div>
  }

  if(!document){

    return <div className='loading'>Yükleniyor... </div>


  }

  return (
    <div className='project-details'>

        <ProjectSummary proje={document}/>
        <ProjectComment proje={document}/>

    </div>
  )
}
