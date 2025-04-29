import { useState, useMemo } from "react";
import products from "./products.json";
import { Product } from "./types";

const App = () => {
  const isError = false;
  const [chosenProductPrice, setChosenProductPrice] = useState(0);
  const [chosenProductName, setChosenProductName] = useState<string>("");
  const [weight, setWeight] = useState("");
  const [total, setTotal] = useState(0);
  const [weightedProducts, setWeightedProducts] = useState<
    { name: string; price: number }[]
  >([]);

  const totalSum = useMemo(
    () =>
      weightedProducts.reduce(
        (acc, weightedProduct) => acc + weightedProduct.price,
        0
      ),
    [weightedProducts]
  );

  const chooseProduct = (price: number, name: string) => {
    setChosenProductPrice(price);
    setChosenProductName(name);
  };

  const calculateTotal = () => {
    const weightNumber = Number(weight);

    const totalPrice = chosenProductPrice * weightNumber;
    setTotal(totalPrice);
    setWeightedProducts((weightedProducts) => [
      ...weightedProducts,
      { name: chosenProductName, price: totalPrice },
    ]);
  };

  const clearInputs = () => {
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
                onClick={() => chooseProduct(product.price, product.name)}
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
            {weightedProducts.map((product, index) => (
              <li key={index}>
                {product.name} - {product.price} €
              </li>
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
      {isError && <div className="error"></div>}
    </div>
  );
};

export default App;
