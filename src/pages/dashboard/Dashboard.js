import React from 'react';
import './Dashboard.css';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './projectFilter';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
 
export default function Dashboard() {
    const { documents, error } = useCollection('projeler');
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [currentFilter, setCurrentFilter] = React.useState('hepsi');

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    };

    const projects = documents
        ? documents.filter((doc) => {
            switch (currentFilter) {
                case 'hepsi':
                    return true;
                case 'benim':
                    let kendiProjelerim = false;
                    doc.projeKullaniciListesi.forEach((k) => {
                        if (k.id === user.uid) {
                            kendiProjelerim = true;
                        }
                    });
                    return kendiProjelerim;
                case 'masaüstü':
                case 'web':
                case 'mobil':
                    return doc.kategori === currentFilter;
                default:
                    return true;
            }
        })
        : null;

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'> {error} </p>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
            {documents && <ProjectList projeler={projects} />}
        </div>
    );
}
