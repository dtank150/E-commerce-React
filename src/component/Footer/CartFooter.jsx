import { Link } from 'react-router-dom';

const CartFooter = ({ cartItems, mode }) => {
  // Check if the cart is empty
  const isCartEmpty = cartItems.length === 0;

  // Conditionally render the link based on the cart's content
  const cartLink = isCartEmpty ? null : (
    <Link to="/cart" style={{ textDecoration: 'none' }}>
      <p
        className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 footer"
        style={{
          backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '',
          color: mode === 'dark' ? 'white' : '',
          position: 'sticky',
          bottom: 0,
          textAlign: 'center',
        }}
      >
        GO TO CART
      </p>
    </Link>
  );

  return cartLink;
};

export default CartFooter;
