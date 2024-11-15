import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes, deleteHero } from '../redux/actions';
import { Link } from 'react-router-dom';
import "./SuperheroList.css";

const SuperheroList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const heroesPerPage = 5;
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/superheroes')
            .then((response) => response.json())
            .then((data) => setHeroes(data))
            .catch((error) => console.error('Error fetching superheroes:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this superhero?')) {
            dispatch(deleteHero(id));
            setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== id));
        }
    };

    const totalPages = Math.ceil(heroes.length / heroesPerPage);
    const currentHeroes = heroes.slice(
        (currentPage - 1) * heroesPerPage,
        currentPage * heroesPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div>
            <div>
                <h1>Superhero Database</h1>
                <h2>List of Superheroes</h2>
                <ul>
                    {currentHeroes.map((hero) => (
                        <li key={hero.id}>
                            <h3>{hero.nickname}</h3>
                            <p><strong>Real Name:</strong> {hero.real_name}</p>
                            <p><strong>Origin Description:</strong> {hero.origin_description}</p>
                            <p><strong>Superpowers:</strong> {hero.superpowers}</p>
                            <p><strong>Catchphrase:</strong> {hero.catch_phrase}</p>
                            <h4>Images:</h4>
                            <ul>
                                {hero.images.map((image, index) => (
                                    <li key={index}>
                                        <img
                                            src={image}
                                            alt={`${hero.nickname} Image ${index + 1}`}
                                            style={{ width: '200px', height: 'auto' }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            <Link to="/create">
                <button>Create New Superhero</button>
            </Link>

            <ul>
                {currentHeroes.map((hero) => (
                    <li key={hero.id}>
                        <Link to={`/details/${hero.id}`}>{hero.nickname}</Link>
                        <Link to={`/edit/${hero.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(hero.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '20px' }}>
                <button disabled={currentPage === 1} onClick={handlePreviousPage}>
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SuperheroList;
