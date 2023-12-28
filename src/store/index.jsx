import { configureStore } from '@reduxjs/toolkit';
import { trackReducer } from './slices';

export default configureStore({
    reducer: {
        tracks: trackReducer,
    },
})