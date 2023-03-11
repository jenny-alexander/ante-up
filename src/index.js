import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App/App';

const container = document.getElementById('react-root');
const root = createRoot(container); 

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);