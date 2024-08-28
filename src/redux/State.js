import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)

// Slice setup
const commonSlice = createSlice({
    name: "common",
    initialState: {
        userDetails: null,
        authToken: null,
        placesStore: [],
        placesArray: [],
        reviewesArr: [],
        selectedReviews: [],
        bookedDates: {
            startDate: new Date(),
            endDate: new Date(),
        },
        bookedSlots: [],
    },
    reducers: {
        setLoginDetails: (state, action) => {
            state.userDetails = action.payload.userDetails;
            state.authToken = action.payload.authToken;
        },
        logout: (state) => {
            state.userDetails = null;
            state.authToken = null;
        },
        setPlaces: (state, action) => {
            state.placesStore = action.payload.placesStore;
            state.placesArray = action.payload.placesArray;
        },
        setReviews: (state, action) => {
            state.reviewesArr = action.payload.reviewesArr
        },
        setSelectedReview: (state, action) => {
            state.selectedReviews = action.payload.selectedReviews;
        },
        setStartDate: (state, action) => {
            return {
                ...state,
                bookedDates: {
                    ...state.bookedDates,
                    startDate: action.payload.startDate
                }
            };
        },
        setEndDate: (state, action) => {
            return {
                ...state,
                bookedDates: {
                    ...state.bookedDates,
                    endDate: action.payload.endDate
                }
            };
        },
        setBookedSlots: (state, action) => {
            state.bookedSlots = action.payload.bookedSlots;
        }
    }
});

// Persist configuration
const persistConfig = {
    key: 'root', // The key for localStorage
    storage, // The storage option, defaulting to localStorage for web
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, commonSlice.reducer);

// Configure store with persisted reducer
const store = configureStore({
    reducer: { common: persistedReducer },
});

// Create the persistor
export const persistor = persistStore(store);

// Export the store and actions
export default store;
export const commonActions = commonSlice.actions;