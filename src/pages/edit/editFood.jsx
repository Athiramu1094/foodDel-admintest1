import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FoodList from "../../components/foodList"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./editFood.css";

const FoodEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [foods, setFoods] = useState([]); 
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
    const fetchFoodItem = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://food-del-backend-8w54.onrender.com/food/${id}`);
          setFoodItem(response.data.data);
          setData(response.data.data);
          setMainImagePreview(response.data.data.mainImage);
          setImagePreview(response.data.data.image);
        }
      } catch (error) {
        console.error("Error fetching food item:", error);
      }
    };

    const fetchAllFoods = async () => {
      try {
        const response = await axios.get("https://food-del-backend-8w54.onrender.com/food");
        setFoods(response.data.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("https://food-del-backend-8w54.onrender.com/restaurant");
        setRestaurants(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    if (id) {
      fetchFoodItem();
    } else {
      fetchAllFoods();
    }

    fetchRestaurants();
  }, [id]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
      setMainImageFile(file);
    }
  };

  const handleItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
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
    if (mainImageFile) formData.append("mainImage", mainImageFile);
    if (imageFile) formData.append("image", imageFile);
    formData.append("rating", data.rating);

    try {
      const response = await axios.put(`https://food-del-backend-8w54.onrender.com/food/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      navigate('/'); 
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error("Error updating food item!");
    }
  };

  return (
    <div className="edit-food">
      {id ? (
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label>Main Image</label>
            <input
              type="file"
              onChange={handleMainImageChange}
            />
            {mainImagePreview && <img src={mainImagePreview} alt="Main Preview" />}
          </div>

          <div className="form-group">
            <label>Food Image</label>
            <input
              type="file"
              onChange={handleItemImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Food Preview" />}
          </div>

          <div className="form-group">
            <label>Food Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salads">Salads</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              
            </select>
          </div>

          <div className="form-group">
            <label>Restaurant</label>
            <select
              name="restaurant"
              value={data.restaurant}
              onChange={onChangeHandler}
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={data.rating}
              onChange={onChangeHandler}
            />
          </div>

          <button type="submit">Update Food Item</button>
        </form>
      ) : (
        <FoodList />
      )}
    </div>
  );
};

export default FoodEdit;
