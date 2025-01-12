import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:4000/allproducts");
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify("error", "Error fetching products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

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

  const removeProduct = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/removeproduct", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await response.json();

      if (data.success) {
        notify("success", "Product removed successfully!");
        await fetchInfo();
      } else {
        notify("error", "Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      notify("error", "Error removing product. Please try again later.");
    }
  };

  return (
    <div className="list-product">
      <h1 className="list-product__title">All Products List</h1>
      <div className="list-product__format-header">
        <p>Products</p>
        <p>Title</p>
        <p>All Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product__products">
        <hr />
        {allProducts.map((product, i) => (
          <div key={i} className="list-product__row">
            <img
              src={product.image}
              alt={product.name}
              className="list-product__icon"
            />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              onClick={() => removeProduct(product.id)}
              src={cross_icon}
              alt="Remove product"
              className="list-product__remove-icon"
            />
            <hr />
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        pauseOnFocusLoss={false}
        transition={Bounce}
      />
    </div>
  );
};

export default ListProduct;
