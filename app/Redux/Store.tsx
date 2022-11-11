import AsyncStorage from '@react-native-async-storage/async-storage';
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { reducers } from './Reducers';

const rootReducer = combineReducers(reducers);
function saveToLocalStorage(state: any) {
    try {
        const serialisedState = JSON.stringify(state);
        AsyncStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState: any = AsyncStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}


const middleware = [thunk];

const store = createStore(rootReducer, loadFromLocalStorage(), applyMiddleware(...middleware));

store.subscribe(() => saveToLocalStorage(store.getState()));


export default store;