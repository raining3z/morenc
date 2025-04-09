import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import MainContextProvider from './store/MainContextProvider';

createRoot(document.getElementById('root')!).render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
);
