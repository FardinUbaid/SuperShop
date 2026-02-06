import './ProductCard.css';
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} />
      )}
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
