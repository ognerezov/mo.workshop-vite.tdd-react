import { render, screen } from '@testing-library/react'
import products from '../products.json'
import userEvent from '@testing-library/user-event'
import App from '../App'

it('should see the scale app', () => {
  render(<App />)

  const weightInput = screen.getByLabelText('Peso:')
  const priceInput = screen.getByLabelText('Precio:')
  const totalInput = screen.getByLabelText('Total:')
  const banana = screen.getByLabelText('Plátano')
  const mango = screen.getByLabelText('Mango')
  const calculateButton = screen.getByText('Calcular')

  expect(weightInput).toBeInTheDocument()
  expect(priceInput).toBeInTheDocument()
  expect(totalInput).toBeInTheDocument()
  expect(banana).toBeInTheDocument()
  expect(mango).toBeInTheDocument()
  expect(calculateButton).toBeInTheDocument()
})

it('should see Precio', async () => {
  render(<App />)

  const priceInput = screen.getByLabelText('Precio:')

  const orange = screen.getByLabelText('Naranja')

  await userEvent.click(orange)
  expect(priceInput).toHaveValue(1.55)
})

it('should calculate Total', async () => {
  render(<App />)

  const weightInput = screen.getByLabelText('Peso:')
  const orange = screen.getByLabelText('Naranja')
  const totalInput = screen.getByLabelText('Total:')
  const calculateButton = screen.getByRole('button', { name: 'Calcular' })

  await userEvent.click(orange)
  await userEvent.type(weightInput, '100')
  await userEvent.click(calculateButton)

  expect(totalInput).toHaveValue(155)
})

it('Set price to 0', async () => {
  render(<App />)

  const weightInput = screen.getByLabelText('Peso:')
  const orange = screen.getByLabelText('Naranja')
  const mango = screen.getByLabelText('Mango')

  await userEvent.click(orange)
  await userEvent.type(weightInput, '100')

  await userEvent.click(mango)

  expect(weightInput).toHaveValue(0)
})

it('should calculate Total and display for 1 product', async () => {
  render(<App />)

  const weightInput = screen.getByLabelText('Peso:')
  const orange = screen.getByLabelText('Naranja')
  const totalInput = screen.getByLabelText('Total:')
  const calculateButton = screen.getByRole('button', { name: 'Calcular' })

  await userEvent.click(orange)
  await userEvent.type(weightInput, '100')
  await userEvent.click(calculateButton)

  expect(totalInput).toHaveValue(155)
  const orangeText = screen.getByText(`Naranja - ${'155.00'}€`)
  const totalText = screen.getByText(`Total - ${'155.00'}€`)

  expect(orangeText).toBeInTheDocument()
  expect(totalText).toBeInTheDocument()
})

it('should calculate Total and display for multiple products', async () => {
  render(<App />)

  const weightInput = screen.getByLabelText('Peso:')
  const orange = screen.getByLabelText('Naranja')
  const totalInput = screen.getByLabelText('Total:')
  const calculateButton = screen.getByRole('button', { name: 'Calcular' })
  const banana = screen.getByLabelText('Plátano')
  const mango = screen.getByLabelText('Mango')

  await userEvent.click(orange)
  await userEvent.type(weightInput, '100')
  await userEvent.click(calculateButton)

  await userEvent.click(banana)
  await userEvent.type(weightInput, '10')
  await userEvent.click(calculateButton)

  await userEvent.click(mango)
  await userEvent.type(weightInput, '1')
  await userEvent.click(calculateButton)

  const bananaText = screen.getByText(`Plátano - ${'16.90'}€`)
  const mangoText = screen.getByText(`Mango - ${2.35}€`)
  const orangeText = screen.getByText(`Naranja - ${'155.00'}€`)
  const totalText = screen.getByText(`Total - ${174.25}€`)

  expect(bananaText).toBeInTheDocument()
  expect(mangoText).toBeInTheDocument()
  expect(orangeText).toBeInTheDocument()
  expect(totalText).toBeInTheDocument()
})

it('should not calculate Total if weight = 0', async () => {
  render(<App />)

  const orange = screen.getByLabelText('Naranja')

  const calculateButton = screen.getByRole('button', { name: 'Calcular' })

  await userEvent.click(orange)
  await userEvent.click(calculateButton)

  const totalText = screen.queryByText('Total - NaN€')
  expect(totalText).not.toBeInTheDocument()
})

// it('should add the same product with different weights', async () => {
//   render(<App />)

//   const orange = screen.getByLabelText('Naranja')

//   const calculateButton = screen.getByRole('button', { name: 'Calcular' })

//   await userEvent.click(orange)
//   await userEvent.type(weightInput, '1')
//   await userEvent.click(calculateButton)

//   await userEvent.clear(weightInput)
//   await userEvent.type(weightInput, '10')
//   await userEvent.click(calculateButton)

//   const orangeText1 = screen.getByText(`Naranja - ${'155.00'}€`)
//   const totalText = screen.getByText(`Total - ${174.25}€`)

//   expect(orangeText).toBeInTheDocument()
//   expect(totalText).toBeInTheDocument()
// })
