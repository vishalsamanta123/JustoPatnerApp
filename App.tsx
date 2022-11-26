import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import configureStore from './app/Redux/Store';
import { PersistGate } from 'redux-persist/es/integration/react';
import Root from 'app/navigation';

const App = () => {

  const { persistor, store } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
