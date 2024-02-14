import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Register from './Pages/Register';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Home from './Pages/Home';
import New from './Pages/New';
import { Provider } from 'react-redux';
import  { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import News from './Pages/News';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import ShoppingCart from './Pages/Cart';
import AddProduct from './Pages/AddProduct';
import AdminHome from './Pages/AdminHome';
import ManageUser from './Pages/ManageUser';
import Dashboard from './Pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/add" element={<AddProduct />}></Route>
        <Route path="/cart" element={<ShoppingCart />}></Route>
        <Route path="/" element={<Welcome />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/admin' element={<Dashboard />}></Route>
        <Route path='/admin/add' element={<New />}></Route>
        <Route path='/admin/home' element={<AdminHome />}></Route>
        <Route path='/admin/manage' element={<ManageUser />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/news' element={< News/>}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes> 
    </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
