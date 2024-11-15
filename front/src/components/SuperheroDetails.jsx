import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SuperheroDetails.css';

const SuperheroDetails = () => {
    const { id } = useParams();
    const [superhero, setSuperhero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuperhero = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/superheroes/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetch');
                }
                const data = await response.json();
                setSuperhero(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuperhero();
    }, [id]);

    if (loading) return <div className="loading">Loading superhero details...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="superhero-details">
            <h1 className="superhero-name">{superhero.nickname}</h1>
            <div className="superhero-info">
                <p><strong>Real Name:</strong> {superhero.real_name}</p>
                <p><strong>Origin:</strong> {superhero.origin_description}</p>
                <p><strong>Superpowers:</strong> {superhero.superpowers}</p>
                <p><strong>Catch Phrase:</strong> {superhero.catch_phrase}</p>
            </div>
            <h3 className="images-title">Images:</h3>
            <div className="superhero-images">
                {superhero.images.map((image, index) => (
                    <img key={index} src={image} alt={`superhero-image-${index}`} className="superhero-image" />
                ))}
            </div>
        </div>
    );
};

export default SuperheroDetails;
