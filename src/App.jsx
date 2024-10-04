import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/sidebar';
import Navbar from './components/Navbar/navbar';

import FoodAdd from './pages/add/foodAdd';
import RestaurantAdd from './pages/add/restaurantAdd';
import Login from './pages/login/login.jsx';
import EditRestaurant from './pages/edit/editRestaurant.jsx'; 
import FoodEdit from './pages/edit/editFood.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-food" element={<FoodAdd />} />
          <Route path="/add-restaurant" element={<RestaurantAdd />} />
          
          <Route path="/edit-restaurant" element={<EditRestaurant />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
          <Route path="/edit-food" element={<FoodEdit />} />
          <Route path="/edit-food/:id" element={<FoodEdit />} />
          
       
         
        </Routes>
      </div>
    </div>
  );
}

export default App;