/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../context/Auth/AuthContext";

export default function ProductCard() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [addedToCart, setAddedToCart] = useState(false);
  console.log(cartItems);
  const navigate = useNavigate();
  const { user } = useAuth();

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Add to cart");
  };
  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = (item) => {
    if (!addedToCart) {
      // Check if user is logged in using Firebase authentication
      if (!user) {
        // Redirect to the login page
        navigate("/login");
      } else {
        dispatch(addToCart(item));
        toast.success("Added to Cart");
        setAddedToCart(true);
      }
    }
  };
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const cardStyle = { marginLeft: "4rem", marginRight: "2rem" };
  return (
    <section className="text-gray-900 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter((obj) => obj.title.toLowerCase().includes(searchkey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .filter((obj) => obj.price.includes(filterPrice)).slice(0,6)
            .map((item, index) => {
              const { title, price, description, imageUrl, id } = item;
              return (
                <div onClick={()=> window.location.href = `/productinfo/${id}`}
                  key={index}
                  className="p-4 md:w-1/4  drop-shadow-lg "
                  style={cardStyle}
                >
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex justify-center cursor-pointer">
                      <img
                        className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                        src={imageUrl}
                        alt="blog"
                      />
                    </div>
                    <div className="p-5 border-t-2">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        E-Commerce
                      </h2>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h1>
                      {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                      <p
                        className="leading-relaxed mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹ {price}
                      </p>
                      <AuthProvider>
                      <div className="flex justify-center">
                    {isProductInCart(id) ? (
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-gray-500 rounded-lg text-sm w-full py-2"
                      >
                        Added to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        type="button"
                        className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                      >
                        {addedToCart ? "Added to Cart" : "Add To Cart"}
                      </button>
                    )}
                  </div>
                  </AuthProvider>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
} 
