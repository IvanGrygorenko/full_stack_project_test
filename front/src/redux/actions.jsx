import axios from 'axios';

// Отримання списку супергероїв з пагінацією
export const fetchHeroes = (page = 1) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/superheroes?page=${page}`);
        dispatch({ type: 'FETCH_HEROES_SUCCESS', payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_HEROES_FAILURE', payload: error.message });
    }
};

// Отримання деталей супергероя за ID
export const fetchHeroDetails = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/superheroes/${id}`);
        dispatch({ type: 'FETCH_HERO_DETAILS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_HERO_DETAILS_FAILURE', payload: error.message });
    }
};

// Додавання нового супергероя
export const createHero = (heroData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/superheroes', heroData);
        dispatch({ type: 'CREATE_HERO_SUCCESS', payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'CREATE_HERO_FAILURE', payload: error.message });
    }
};

// Оновлення супергероя
export const updateHero = (id, heroData) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/superheroes/${id}`, heroData);
        dispatch({ type: 'UPDATE_HERO_SUCCESS', payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'UPDATE_HERO_FAILURE', payload: error.message });
    }
};

// Видалення супергероя
export const deleteHero = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/superheroes/${id}`);
        dispatch({ type: 'DELETE_HERO_SUCCESS', payload: id });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'DELETE_HERO_FAILURE', payload: error.message });
    }
};