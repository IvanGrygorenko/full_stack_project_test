import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHero, updateHero, fetchHeroDetails } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import "./SuperheroForm.css"


const SuperheroForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const heroDetails = useSelector(state => state.heroDetails);
    const [formData, setFormData] = useState({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',
        images: []
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchHeroDetails(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (heroDetails && id) {
            setFormData(heroDetails);
        }
    }, [heroDetails, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setFormData({
            ...formData,
            images: files
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateHero(id, formData));
        } else {
            dispatch(createHero(formData));
        }
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nickname:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Real Name:</label>
                <input
                    type="text"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Origin Description:</label>
                <textarea
                    name="origin_description"
                    value={formData.origin_description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Superpowers:</label>
                <textarea
                    name="superpowers"
                    value={formData.superpowers}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Catch Phrase:</label>
                <input
                    type="text"
                    name="catch_phrase"
                    value={formData.catch_phrase}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Images:</label>
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleImagesChange}
                />
            </div>

            <button type="submit">{id ? 'Update' : 'Create'} Superhero</button>
        </form>
    );
};

export default SuperheroForm;
