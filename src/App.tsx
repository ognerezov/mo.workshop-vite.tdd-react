import { useState } from "react";
import products from "./products.json";
import { Product } from "./types";

const EMPTY = 0;
const NO_ERROR = false;

const App = () => {
  const [error, setError] = useState(NO_ERROR);
  const [chosenProductPrice, setChosenProductPrice] = useState(0);

  const chooseProduct = (price: number) => {
    setChosenProductPrice(price);
  };

  return (
    <div className="app">
      <div className="display">
        <label htmlFor="weight">Peso:</label>
        <input id="weight" name="weight" type="number" placeholder="0,000" />

        <label htmlFor="price">Precio:</label>
        <input
          id="price"
          type="number"
          placeholder="0,000"
          readOnly
          disabled
          value={chosenProductPrice}
        />
        <label>
          <span>Total:</span>
          <input type="number" placeholder="0,000" disabled />
        </label>
      </div>
      <div className="controls">
        <div className="products">
          {products.map((product: Product) => {
            return (
              <button
                key={product.id}
                aria-label={product.name}
                value={product.price}
                onClick={() => chooseProduct(product.price)}
              >
                <img src={product.image} alt="" />
              </button>
            );
          })}
        </div>
        <div className="sidebar" data-testid="sidebar">
          <div>
            <button>Calcular</button>
          </div>
        </div>
      </div>
      {error && <div className="error">Error</div>}
    </div>
  );
};

export default App;
