/* eslint-disable react/jsx-key */
import { useEffect, useContext, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../component/Layout/Layout";
import Model from "../../component/Model/Model";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, setCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch(); // Move the dispatch definition to the top

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity === 0) {
      // If the new quantity is zero, remove the item from the cart
      dispatch(deleteFromCart(item));
      toast.success("Delete cart");
    } else {
      // Otherwise, update the quantity in the cart
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      dispatch(setCart(updatedCart));
    }
  };

  const increaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    updateQuantity(item, newQuantity);
  };

  const decreaseQuantity = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 0) {
      updateQuantity(item, newQuantity);
    }
  };

  const context = useContext(myContext);
  const { mode } = context;
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount based on items in the cart
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price) * cartItem.quantity;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  //const shipping = parseInt(100);

  //const grandTotal = shipping + totalAmount;
  const grandTotal = totalAmount;
  console.log(grandTotal);

  return (
    <Layout>
      <div
        className="h-screen bg-gray-100 pt-5 mb-[60%]"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                if (!item || typeof item.price === "undefined") {
                  return null;
                }
                const { title, price, description, quantity, imageUrl } = item;

                return (
                  <div
                    key={item.id}
                    className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  >
                    <img
                      src={imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {title}
                        </h2>
                        <h2 className="text-sm  text-gray-900">
                          {description}
                        </h2>
                        <p className="mt-1 text-xs font-semibold text-gray-700">
                          ₹{price}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center">
                          <button
                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md mr-1"
                            onClick={() => decreaseQuantity(item)}
                          >
                            -
                          </button>
                          <span className="text-gray-900 font-semibold">
                            {quantity}
                          </span>
                          <button
                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md ml-1"
                            onClick={() => increaseQuantity(item)}
                          >
                            +
                          </button>
                        </div>

                        <svg
                          onClick={() => deleteCart(item)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                      {/* <div className="mt-2 text-gray-700">
                        <p>
                          <span className="font-semibold">{title}:</span> ₹
                          {productTotal}
                        </p>
                      </div> */}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center">
                <h1 className="mb-10 text-2xl font-bold">
                  Your Shopping Cart is Empty
                </h1>
                <Link
                  to="/allproducts"
                  className="text-blue-500 font-bold border-b border-blue-500"
                >
                  Go to shopping
                </Link>
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div
              className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
              style={{
                backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="mb-2">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <b>Bill</b>
                  </div>
                </p>
                <hr className="my-4" />
                {cartItems.map((item) => {
                  if (!item || typeof item.price === "undefined") {
                    return null;
                  }

                  const { title, price, quantity } = item;
                  const productTotal = parseInt(price) * quantity;

                  return (
                    <p
                      key={item.id}
                      className="text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      <strong style={{ marginRight: "8px" }}>{title}:</strong> ₹
                      {productTotal}
                    </p>
                  );
                })}
                <hr className="my-4" />
                <div className="flex justify-between mb-3">
                  <p
                    className="text-lg font-bold"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Total
                  </p>
                  <div>
                    <p
                      className="mb-1 text-lg font-bold"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹{grandTotal}
                    </p>
                  </div>
                </div>
              </div>
              <Model />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
