import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./../pages/edit/editFood.css"; // Ensure your styles are imported

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const navigate = useNavigate();
  const foodUrl = "https://food-del-backend-8w54.onrender.com/food";// API URL for food items

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch foods
        const foodResponse = await axios.get(foodUrl);
        setFoods(foodResponse.data.data); // Set the list of food items

        // Fetch restaurants
        const restaurantResponse = await axios.get("https://food-del-backend-8w54.onrender.com/restaurant");
        const restaurantData = restaurantResponse.data.data;

        // Map restaurant data by ID
        const restaurantMap = restaurantData.reduce((map, restaurant) => {
          map[restaurant._id] = restaurant.name;
          return map;
        }, {});

        setRestaurants(restaurantMap); // Set the map of restaurant IDs to names
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${foodUrl}/${id}`);
      toast.success("Food item deleted successfully!");
      // Refresh the list of foods
      setFoods(foods.filter((food) => food._id !== id));
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Error deleting food item!");
    }
  };

  return (
    <div className="food-list">
      {foods.length > 0 ? (
        foods.map((food) => (
          <div key={food._id} className="food-item">
            <img src={food.image} alt={food.name} />
            <p>{food.name}</p>
            <span>{restaurants[food.restaurant] || "Unknown"}</span>
            <button onClick={() => navigate(`/edit-food/${food._id}`)}>Edit</button>
            <button onClick={() => handleDelete(food._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No food items available</p>
      )}
    </div>
  );
};

export default FoodList;
