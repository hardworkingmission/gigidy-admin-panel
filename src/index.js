import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from "react-router-dom";
import './index.css';
import './styles/rootStyle.scss'

import reportWebVitals from './reportWebVitals';
import { rootRouter } from './routes/rootRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // // <React.StrictMode>
  //   <RouterProvider router={rootRouter}/>
  // // </React.StrictMode> */
  <RouterProvider router={rootRouter}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
