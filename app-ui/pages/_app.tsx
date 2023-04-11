import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import PersistProtector from '../components/PersistProtector';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PersistProtector />
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </PersistGate>
    </Provider>
  );
}
