import AsyncStorage from '@react-native-async-storage/async-storage';
import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducers from './Reducers';

// const rootReducer = combineReducers(reducers);
// function saveToLocalStorage(state: any) {
//     try {
//         const serialisedState = JSON.stringify(state);
//         AsyncStorage.setItem("persistantState", serialisedState);
//     } catch (e) {
//         console.warn(e);
//     }
// }

// function loadFromLocalStorage() {
//     try {
//         const serialisedState: any = AsyncStorage.getItem("persistantState");
//         if (serialisedState === null) return undefined;
//         return JSON.parse(serialisedState);
//     } catch (e) {
//         console.warn(e);
//         return undefined;
//     }
// }


// const middleware = [thunk];

// const store = createStore(rootReducer, loadFromLocalStorage(), applyMiddleware(...middleware));

// store.subscribe(() => saveToLocalStorage(store.getState()));


// export default store;
function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    AsyncStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: true,
};

const middleware = [thunk];
const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig: any = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
store.subscribe(() => saveToLocalStorage(store.getState()));
const persistor = persistStore(store, persistConfig, () => {
});
const configureStore = () => {
  return { persistor, store };
};


export default configureStore;

