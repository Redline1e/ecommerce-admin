import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProductDetails({ ...productDetails, image: file });
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const notify = (type, message) => {
    const options = {
      position: "top-center",
      autoClose: 2500,
      transition: Bounce,
    };

    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warn":
        toast.warn(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      default:
        toast(message, options);
    }
  };

  const addProduct = async () => {
    if (!productDetails.name) {
      notify("warn", "Please enter a product name!");
      return;
    }

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    try {
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      responseData = await uploadResponse.json();
    } catch (error) {
      console.error("Error uploading image:", error);
      notify("error", "Error uploading image. Please try again later.");
      return;
    }

    if (responseData.success) {
      product.image = responseData.image_url;

      try {
        const addProductResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          notify("success", "Product Added Successfully!");
        } else {
          notify("error", "Failed to add product.");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        notify("error", "Error adding product. Please try again later.");
      }
    } else {
      notify("error", "Image upload failed. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <div className="add-product__field">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="add-product__field">
        <div className="add-product__price">
          <div>
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here"
            />
          </div>
          <div>
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here"
            />
          </div>
        </div>
      </div>
      <div className="add-product__field">
        <p>Product category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product__select"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-product__field">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Upload product"
            className="add-product__thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="add-product__btn">
        ADD
      </button>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        transition={Bounce}
      />
    </div>
  );
};

export default AppProduct;
