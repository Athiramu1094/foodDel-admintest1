import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <NavLink to="/add-food" className='sidebar-link'>
            <p>Add Food Item</p>
            <span className="material-symbols-outlined">
                note_stack_add
            </span>
        </NavLink>
        <NavLink to="/add-restaurant" className='sidebar-link'>
            <p>Add Restaurant</p>
            <span className="material-symbols-outlined">
                note_stack_add
            </span>
        </NavLink>
     
        <NavLink to="/edit-food" className='sidebar-link'>
            <p>Edit Food</p>
            <span className="material-symbols-outlined">
                edit_note
            </span>
        </NavLink>
        <NavLink to="/edit-restaurant" className='sidebar-link'>
            <p>Edit Restaurant</p>
            <span className="material-symbols-outlined">
                edit_note
            </span>
        </NavLink>
       
    </div>
  );
}

export default Sidebar;
