import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import NotFound from '../NotFound/NotFound';
import UserAdd from '../UserAdd/UserAdd';
import UserApp from '../UserApp/UserApp';
import UserEdit from '../UserEdit/UserEdit';

const Router = () => {

  return (
    <div>

      <BrowserRouter >

      <Navbar />

        <Routes>
          <Route path="/" element={ <UserApp /> } />
          <Route path="/agregar" element={ <UserAdd /> } /> 
          <Route path="/editar" element={ <UserEdit /> } /> 
          <Route path="*" element={ <NotFound /> } />
        </Routes>

      <Footer />

      </BrowserRouter>

    </div>
  )
};

export default Router;
