// src/components/Button/Button.jsx
import "./Button.css";

export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
}
