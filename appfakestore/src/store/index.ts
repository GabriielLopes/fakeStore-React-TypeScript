import rootReducer from './modules/rootReducer';
import persistedReducer from './modules/reduxPersist';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore } from 'redux-persist';

const store = createStore(persistedReducer(rootReducer), applyMiddleware(thunk));

export const persistor = persistStore(store);

export default store;
