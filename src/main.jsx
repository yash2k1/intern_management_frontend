
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';  // import Toaster
import App from './App';
import { store } from './app/store'; 
import './tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <BrowserRouter>
        <>
          <App />
          <Toaster position="top-right" /> {/* Add Toaster here */}
        </>
      </BrowserRouter>
    </Provider>
 
);
