import React, { useState, useEffect } from "react";
import axios from "axios";
import "./add.css";
import { toast } from "react-toastify";

const FoodAdd = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads",
    restaurant: "",
    rating: "",
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("https://food-del-backend-8w54.onrender.com/restaurant");
        setRestaurants(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
      setMainImageFile(file);
    } else {
      console.error("No file selected or invalid file.");
    }
  };

  const handleItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      console.error("No file selected or invalid file.");
    }
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
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("restaurant", data.restaurant);
    formData.append("mainImage", mainImageFile); // Add main image to form data
    formData.append("image", imageFile); // Add secondary image to form data
    formData.append("rating", data.rating);

    try {
      const response = await axios.post("https://food-del-backend-8w54.onrender.com/food", formData);

      setData({
        name: "",
        description: "",
        price: "",
        category: "Salads",
        restaurant: "",
        rating: "",
      });
      setMainImageFile(null);
      setMainImagePreview(null);
      setImageFile(null);
      setImagePreview(null);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding food item!");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image flex-col">
          <p>Upload Main Image</p>
          <label htmlFor="mainImage">
            <img
              src={mainImagePreview || "/item-image-placeholder.png"}
              alt="Upload Main Image"
            />
          </label>
          <input
            onChange={handleMainImageChange}
            type="file"
            id="mainImage"
            name="mainImage"
            hidden
            required
          />
        </div>

        <div className="add-image flex-col">
          <p>Upload Food Item Image</p>
          <label htmlFor="itemImage">
            <img
              src={imagePreview || "/item-image-placeholder.png"}
              alt="Upload Food Item"
            />
          </label>
          <input
            onChange={handleItemImageChange}
            type="file"
            id="itemImage"
            name="image"
            hidden
            required
          />
        </div>

        <div className="addName flex-col">
          <p>Food Item Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="addDesc flex-col">
          <p>Food Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write here"
            required
          ></textarea>
        </div>

        <div className="addPrice flex-col">
          <p>Price</p>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="₹20"
            required
          />
        </div>

        <div className="addRating flex-col">
          <p>Rating</p>
          <input
            onChange={onChangeHandler}
            value={data.rating}
            type="number"
            name="rating"
            placeholder="4.0"
            required
          />
        </div>

        <div className="addCategory flex-col">
          <p>Category</p>
          <select
            onChange={onChangeHandler}
            name="category"
            value={data.category}
            required
          >
            <option value="Biriyani">Biriyani</option>
            <option value="Pizza">Pizza</option>
            <option value="Fries">Fries</option>
            <option value="Salads">Salads</option>
            <option value="Burger">Burger</option>
            <option value="Porotta">Porotta</option>
            <option value="Shawarma">Shawarma</option>
          </select>
        </div>

        <select
          onChange={onChangeHandler}
          name="restaurant"
          value={data.restaurant}
          required
        >
          <option value="">Select a Restaurant</option>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))
          ) : (
            <option disabled>No restaurants available</option>
          )}
        </select>

        <button type="submit">Add Food Item</button>
      </form>
    </div>
  );
};

export default FoodAdd;
