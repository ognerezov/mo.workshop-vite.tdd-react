import products from './products.json'
import { Product } from 'types'

const App = () => {
  const isError = false

  return (
    <div className="app">
      <div className="display">
        <label htmlFor="weight">
          Peso:
          <input id="weight" name="weight" type="number" placeholder="0,000" />
        </label>

        <label htmlFor="price">
          Precio:
          <input id="price" type="number" placeholder="0,000" readOnly />
        </label>
        <label htmlFor="total">
          Total:
          <input id="total" type="number" placeholder="0,000" readOnly />
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
                onClick={() => null}
              >
                <img src={product.image} alt="" />
              </button>
            )
          })}
        </div>
        <aside className="sidebar">
          <div>
            <button>Calcular</button>
          </div>
        </aside>
      </div>
      {isError && <div className="error"></div>}
    </div>
  )
}

export default App
