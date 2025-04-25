import { useState, useMemo } from "react";
import products from "./products.json";
import { Product } from "./types";

const validateInputs = (weight: number, chosenProductPrice: number) => {
  return !chosenProductPrice || !weight;
};

const App = () => {
  const [error, setError] = useState(false);
  const [chosenProductPrice, setChosenProductPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const [total, setTotal] = useState(0);
  const [totals, setTotals] = useState<number[]>([]);

  const totalSum = useMemo(() => totals.reduce((acc, curr) => acc + curr, 0), [totals]);

  const chooseProduct = (price: number) => {
    setChosenProductPrice(price);
    setError(false);
  };

  const calculateTotal = () => {
    const weightNumber = Number(weight);
    const isError = validateInputs(weightNumber, chosenProductPrice);

    setError(isError);
    if (isError) {
      return;
    }

    const totalPrice = chosenProductPrice * weightNumber;
    setTotal(totalPrice);
    setTotals((totals) => [...totals, totalPrice]);
  };

  const clearInputs = () => {
    setError(false);
    setChosenProductPrice(0);
    setTotal(0);
    setWeight("");
  };

  return (
    <div className="app">
      <div className="display">
        <label htmlFor="weight">
          Peso:
          <input
            id="weight"
            name="weight"
            type="number"
            placeholder="0,000"
            value={weight}
            onChange={(e) => setWeight(e.currentTarget.value)}
          />
        </label>

        <label htmlFor="price">
          Precio:
          <input
            id="price"
            type="number"
            placeholder="0,000"
            readOnly
            disabled
            value={chosenProductPrice}
          />
        </label>
        <label htmlFor="total">
          Total:
          <input
            id="total"
            type="number"
            placeholder="0,000"
            disabled
            value={total}
          />
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
        <aside className="sidebar">
          <div>
            <button onClick={calculateTotal}>Calcular</button>
          </div>
          <ul>
            {totals.map((price) => (
              <li>{price} €</li>
            ))}
          </ul>
          <div>
            <span>Total - {totalSum} €</span>
          </div>
          <div>
            <button onClick={clearInputs}>Limpiar</button>
          </div>
        </aside>
      </div>
      {error && <div className="error">Error</div>}
    </div>
  );
};

export default App;
