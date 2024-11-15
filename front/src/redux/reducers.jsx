const initialState = {
    heroes: [],
    heroDetails: null,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
};

export const superheroReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_HEROES_SUCCESS':
            const heroesData = Array.isArray(action.payload.heroes) ? action.payload.heroes : [];
            return {
                ...state,
                heroes: heroesData,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                loading: false,
                error: null,
            };
        case 'FETCH_HEROES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'FETCH_HERO_DETAILS_SUCCESS':
            return {
                ...state,
                heroDetails: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_HERO_DETAILS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'CREATE_HERO_SUCCESS':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                loading: false,
                error: null,
            };
        case 'CREATE_HERO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'UPDATE_HERO_SUCCESS':
            return {
                ...state,
                heroes: state.heroes.map(hero =>
                    hero.id === action.payload.id ? action.payload : hero
                ),
                loading: false,
                error: null,
            };
        case 'UPDATE_HERO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_HERO_SUCCESS':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload),
                loading: false,
                error: null,
            };
        case 'DELETE_HERO_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};