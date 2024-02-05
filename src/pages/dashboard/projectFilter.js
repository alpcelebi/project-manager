import React from 'react';

const filterList = ['hepsi', 'benim', 'masaüstü', 'web', 'mobil'];

export default function ProjectFilter({ currentFilter, changeFilter }) {
    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    };

    return (
        <div className="project-filter">
            <nav>
                <p>Filtrele:</p>
                {filterList.map((f) => (
                    <button
                        key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    );
}
