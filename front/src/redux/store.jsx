import { configureStore } from '@reduxjs/toolkit';
import { superheroReducer } from './reducers';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: superheroReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;