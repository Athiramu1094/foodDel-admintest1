import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RestaurantList from "../../components/restaurantList";
import "./editRestaurant.css";

const EditRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    address: "",
    cuisine: "",
    rating: "",
  });
  const restaurantUrl = "https://food-del-backend-8w54.onrender.com/restaurant";
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(restaurantUrl);
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [restaurantUrl]);

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await axios.get(`${restaurantUrl}/${id}`);
          console.log("Fetched restaurant data:", response.data);
          setData(response.data.data); 
          setRestaurantImage(response.data.data.image); 
        } catch (error) {
          console.error("Error fetching restaurant:", error);
        }
      };

      fetchRestaurant();
    }
  }, [id, restaurantUrl]);

  const handleRestaurantImageChange = (e) => {
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
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = id
        ? await axios.put(`${restaurantUrl}/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post(restaurantUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      setData({ name: "", address: "", cuisine: "", rating: "" });
      setImageFile(null);
      setRestaurantImage(null);
      toast.success(response.data.message || "Restaurant updated successfully!");
      navigate("/list");
    } catch (error) {
      console.error("Error updating restaurant:", error);
      toast.error("Error updating restaurant!");
    }
  };

  return (
    <div className="edit-container">
      {id ? (
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

            <button type="submit">Update Restaurant</button>
          </div>
        </form>
      ) : (
        <RestaurantList
          restaurants={restaurants}
          onEditClick={(id) => navigate(`/edit-restaurant/${id}`)}
        />
      )}
    </div>
  );
};

export default EditRestaurant;
