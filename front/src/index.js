import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client"
import App from './App';
import './sass/general.scss';


// NEW

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)
root.render(<App />);


