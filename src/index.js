import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Register from './Pages/Register';
import Sign from './Pages/Login';
import Home from './Pages/Home';
import New from './Pages/New';
import { Provider } from 'react-redux';
import  { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/new' element={<New />}></Route>
      </Routes> 
    </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
