import './styles/App.css';
import ProductCard from './components/Child/ProductCard';
import CartDrawer from './components/Cart/CartDrawer';
import AddProductModal from './components/addProduct/AddProductModal';
import AddProductForm from './components/addProduct/AddProductForm';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/productsSlice";
import { toggleCart } from "./store/cartSlice";

function App() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <header>
        <h1>My Shop</h1>
        <button onClick={() => dispatch(toggleCart())}>
          Cart
        </button>
      </header>

      <main>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </main>

      <CartDrawer />

      <button
        className="add-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </button>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2>Add New Product</h2>
        <AddProductForm onClose={() => setIsModalOpen(false)} />
      </AddProductModal>
    </div>
  );
}

export default App;
