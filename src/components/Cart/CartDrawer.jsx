import './CartDrawer.css';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  closeCart,
  addToCart,
  removeFromCart
} from "../../store/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector(state => state.cart);

  const [paidAmount, setPaidAmount] = useState('');
  const [message, setMessage] = useState('');

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (parseFloat(paidAmount) === total) {
      setMessage("✔ Checkout successful");
      dispatch(clearCart());
      setPaidAmount('');
    } else {
      setMessage("❌ Payment amount does not match total");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <button
        className="close-btn"
        onClick={() => dispatch(closeCart())}
      >
        ✕
      </button>

      <h2>Cart</h2>
      <hr />

      {items.length > 0 && (
        <button
          className="clear-btn"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      )}
      <hr />

      {items.length === 0 && <p className="empty-message">Cart is empty</p>}

      {items.map(item => (
        <div key={item.id} className="cart-item-row">
          <span className="item-name">{item.name}</span>

          <div className="quantity-controls">
            <button
              onClick={() => dispatch(removeFromCart(item))}
              className="qty-btn"
            >
              –
            </button>
            <span className="qty">{item.quantity}</span>
            <button
              onClick={() => dispatch(addToCart(item))}
              className="qty-btn"
            >
              +
            </button>
          </div>

          <span className="item-total">${item.price * item.quantity}</span>
        </div>
      ))}

      <hr />
      <h3>Total: ${total}</h3>

      <input
        type="number"
        placeholder="Enter paid amount"
        value={paidAmount}
        onChange={(e) => setPaidAmount(e.target.value)}
      />

      <button onClick={checkout}>
        Checkout
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CartDrawer;
