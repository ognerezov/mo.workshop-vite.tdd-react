import {useRef, useState} from "react";
import products from "./products.json";
import { Product } from "./types";

const NO_ERROR = false;

const App = () => {
  const [error, setError] = useState(NO_ERROR);
  const [chosenProductPrice, setChosenProductPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const weightRef =useRef<HTMLInputElement>(null);
  const chooseProduct = (price: number) => {
    setChosenProductPrice(price);
    setError(false)
  };

  const calculateTotal = () => {
    checkPrice()
    checkWeight()
    const weight = weightRef?.current?.value
    if(!weight) return

    setTotal(chosenProductPrice * Number(weight))
  }

  const checkPrice =() =>{
    if(!chosenProductPrice) setError(true)
  }

  const checkWeight =() =>{
    if(!weightRef?.current?.value) setError(true)
  }

  return (
    <div className="app">
      <div className="display">
        <label htmlFor="weight">Peso:</label>
        <input ref={weightRef} id="weight" name="weight" type="number" placeholder="0,000"/>

        <label htmlFor="price">Precio:</label>
        <input
            id="price"
            type="number"
            placeholder="0,000"
            readOnly
            disabled
            value={chosenProductPrice}
        />
        <label htmlFor='total'>
          Total:
        </label>
        <input id='total' type="number" placeholder="0,000" disabled value={total}/>
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
            <button onClick={calculateTotal}>Calcular</button>
          </div>
        </div>
      </div>
      {error && <div className="error">Error</div>}
    </div>
  );
};

export default App;
