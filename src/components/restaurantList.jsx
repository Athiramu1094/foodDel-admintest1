import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RestaurantList = ({ restaurants, onEditClick }) => {
  const navigate = useNavigate();
  const restaurantUrl = "https://food-del-backend-8w54.onrender.com/restaurant";

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${restaurantUrl}/${id}`);
      toast.success("Restaurant deleted successfully!");
      // Optionally refresh the list of restaurants
      // You can trigger a state update or refetch restaurants here
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      toast.error("Error deleting restaurant!");
    }
  };

  return (
    <div className="edit-container">
      <ul>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <li key={restaurant._id}>
              <img src={restaurant.image} alt={restaurant.name} />
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}</p>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p>Rating: {restaurant.rating}</p>
              <button onClick={() => onEditClick(restaurant._id)}>Edit Restaurant</button>
              <button onClick={() => handleDelete(restaurant._id)}>Delete Restaurant</button>
            </li>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </ul>
    </div>
  );
};

export default RestaurantList;
