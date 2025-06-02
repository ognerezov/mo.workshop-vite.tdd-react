import { useCallback, useMemo, useState } from 'react'
import products from './products.json'
import { Product } from 'types'

const App = () => {
  const isError = false
  const [currentProduct, setCurrentProduct] = useState(null)
  const currentPrice = useMemo(
    () => currentProduct?.price || 0,
    [currentProduct],
  )
  const [weight, setWeight] = useState(0)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, prod) => acc + prod.total, 0)
  }, [cart])

  const calculate = useCallback(() => {
    if (!weight) {
      return
    }
    setTotal(weight * currentPrice)
    console.log(weight)
    console.log(currentPrice)
    setCart((currentCart) => {
      return [
        ...currentCart,
        { ...currentProduct, total: weight * currentPrice },
      ]
    })
  }, [weight, currentPrice, currentProduct])

  const updateWeight = useCallback((e) => {
    console.log(e?.target.value)
    console.log(parseFloat(e?.target.value))
    setWeight(parseFloat(e?.target.value))
  }, [])

  const setProduct = useCallback((product: any) => {
    setCurrentProduct(product)
    setWeight(0)
  }, [])

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
            onChange={updateWeight}
            value={weight}
          />
        </label>

        <label htmlFor="price">
          Precio:
          <input
            id="price"
            type="number"
            placeholder="0,000"
            value={currentPrice}
          />
        </label>
        <label htmlFor="total">
          Total:
          <input
            id="total"
            type="number"
            placeholder="0,000"
            readOnly
            value={total === 0 ? undefined : total}
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
                onClick={() => setProduct(product)}
              >
                <img src={product.image} alt="" />
              </button>
            )
          })}
        </div>
        <aside className="sidebar">
          <div>
            <button onClick={calculate}>Calcular</button>
          </div>

          {cart.map((product) => (
            <div
              style={{ fontWeight: 300 }}
            >{`${product.name} - ${product.total.toFixed(2)}€`}</div>
          ))}
          <div>{`Total - ${cartTotal.toFixed(2)}€`}</div>
        </aside>
      </div>
      {isError && <div className="error"></div>}
    </div>
  )
}

export default App
