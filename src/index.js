import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
reportWebVitals();
root.render(
    <I18nextProvider i18n={i18n}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </I18nextProvider>,
    document.getElementById('root'),
);
