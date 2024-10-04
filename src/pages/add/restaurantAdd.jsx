import React, { useState } from "react";
import axios from "axios";
import "./add.css";
import { toast } from "react-toastify";

const RestaurantAdd = () => {
  const restaurantUrl = "https://food-del-backend-8w54.onrender.com/restaurant"; // API endpoint for restaurants
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    address: "",
    cuisine: "",
    rating: "",
  
  });

  const handleRestaurantImageChange = (e) => {
    // setRestaurantImage(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    setRestaurantImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("cuisine", data.cuisine);
    formData.append("rating", data.rating);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(restaurantUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

      setData({
        name: "",
        address: "",
        cuisine: "",
        rating: "",
        
      })
      setImageFile(null);
      setRestaurantImage(null);
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error   :", error);
      toast.error("Error adding restaurant!");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image flex-col">
          <p>Upload Restaurant Image</p>
          <label htmlFor="restaurantImage">
            <img
              src={restaurantImage || "/restaurant-image-placeholder.png"}
              alt="Upload Restaurant"
              name="image"
            />
          </label>
          <input
            onChange={handleRestaurantImageChange}
            type="file"
            id="restaurantImage"
            name="image"
            hidden
            required
          />

          <div className="addName flex-col">
            <p>Restaurant Name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Type here"
              required
            />
          </div>

          <div className="address flex-col">
            <p>Address</p>
            <textarea
              onChange={onChangeHandler}
              value={data.address}
              name="address"
              rows="2"
              placeholder="Write here"
              required
            ></textarea>
          </div>

          <div className="cuisine flex-col">
            <p>Cuisine</p>
            <input
              onChange={onChangeHandler}
              value={data.cuisine}
              type="text"
              name="cuisine"
            />
          </div>

          <div className="rating flex-col">
            <p>Restaurant Rating</p>
            <input
              onChange={onChangeHandler}
              value={data.rating}
              type="number"
              name="rating"
            />
          </div>

        

          <button type="submit">Add Restaurant</button>
        </div>
      </form>
      
    </div>
  );
};

export default RestaurantAdd;
