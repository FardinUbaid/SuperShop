import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../../store/productsSlice";
import "./AddProductForm.css";

function AddProductForm({ onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProductAsync({
      name,
      description,
      price: parseFloat(price)
    }));

    setName("");
    setDescription("");
    setPrice("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
