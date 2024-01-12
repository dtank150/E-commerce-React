/* eslint-disable no-unused-vars */
import Layout from "../../component/Layout/Layout";
import HeroSection from "../../component/HeroSection/HeroSection";
import Filter from "../../component/Filter/Filter";
import ProductCard from "../../component/ProductCard/ProductCard";
import Testimonial from "../../component/Testimonial/Testimonial";
import Track from "../../component/Treack/Track";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import CartFooter from '../../component/Footer/CartFooter'
import { useContext } from "react";
import myContext from "../../context/data/myContext";

function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  const context = useContext(myContext);
  const {mode} = context

  const addCart = () => {
    dispatch(addToCart("Shirt"));
  };
  const deleteCart = () => {
    dispatch(deleteFromCart("Shirt"));
  };

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
      <CartFooter cartItems={cartItem} mode={mode}/> 
    </Layout>
  );
}

export default Home;
