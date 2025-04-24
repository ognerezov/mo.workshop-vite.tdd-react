import { useState} from "react";
import products from "./products.json";
import { Product } from "./types";


const validateInputs =(weight:number, chosenProductPrice:number) =>{
  return !chosenProductPrice || !weight
}

const App = () => {
  const [error, setError] = useState(false);
  const [chosenProductPrice, setChosenProductPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [total, setTotal] = useState(0);

  const chooseProduct = (price: number) => {
    setChosenProductPrice(price);
    setError(false)
  };

  const calculateTotal = () => {
    const isError = validateInputs(weight, chosenProductPrice)

    setError(isError)
    if(isError) {
      return
    }

    setTotal(chosenProductPrice * weight)
  }

  const clearInputs = () => {
    setError(false)
    setChosenProductPrice(0)
    setTotal(0)
    setWeight(0)
  }

  return (
    <div className="app">
      <div className="display">
        <label htmlFor="weight">Peso:</label>
        <input
            id="weight"
            name="weight"
            type="number"
            placeholder="0,000"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
        />

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
          <div>
            <button onClick={clearInputs}>Limpiar</button>
          </div>
        </div>
      </div>
      {error && <div className="error">Error</div>}
    </div>
  );
};

export default App;
