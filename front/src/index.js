import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client"
import App from './App';
import './sass/general.scss';

// OLD
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// NEW

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)
root.render(<App />);


