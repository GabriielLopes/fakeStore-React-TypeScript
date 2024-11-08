import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// eslint-disable-next-line import/no-anonymous-default-export
export default (reducers: any) => {
  const persistedReducers = persistReducer(
    {
      key: 'CONSUMO-API-FAKE-STORE',
      storage,
      whitelist: ['carrinho', 'loading', 'produtos'],
    },
    reducers
  );

  return persistedReducers;
};
