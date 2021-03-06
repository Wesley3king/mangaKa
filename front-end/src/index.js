import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Main';
import Info from './Info';
import Leitor from './Leitor';
import Search from './Search';
import Adicionar from "./Adicionar";
import reportWebVitals from './reportWebVitals';
import {HashRouter,Routes,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/manga' element={<Info />} />
      <Route path='/manga/leitor' element={<Leitor />} />
      <Route path='/pesquisar' element={<Search />} />
      <Route path='/adicionar' element={<Adicionar />} />
    </Routes>
  </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
