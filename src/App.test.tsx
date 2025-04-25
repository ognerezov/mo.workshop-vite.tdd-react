import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import App from "./App";

it("should see the scale app", () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  const priceInput = screen.getByLabelText("Precio:");
  const totalInput = screen.getByLabelText("Total:");
  const banana = screen.getByLabelText("Plátano");
  const orange = screen.getByLabelText("Naranja");
  const grape = screen.getByLabelText("Uva");
  const watermelon = screen.getByLabelText("Sandía");
  const melon = screen.getByLabelText("Melón");
  const kiwi = screen.getByLabelText("Kiwi");
  const earlyFig = screen.getByLabelText("Breva");
  const avocado = screen.getByLabelText("Aguacate");
  const mango = screen.getByLabelText("Mango");
  const calculateButton = screen.getByText("Calcular");
  const error = screen.queryByText("Error");

  expect(weightInput).toBeInTheDocument();
  expect(priceInput).toBeInTheDocument();
  expect(totalInput).toBeInTheDocument();
  expect(banana).toBeInTheDocument();
  expect(orange).toBeInTheDocument();
  expect(grape).toBeInTheDocument();
  expect(watermelon).toBeInTheDocument();
  expect(melon).toBeInTheDocument();
  expect(kiwi).toBeInTheDocument();
  expect(earlyFig).toBeInTheDocument();
  expect(avocado).toBeInTheDocument();
  expect(mango).toBeInTheDocument();
  expect(calculateButton).toBeInTheDocument();
  expect(error).not.toBeInTheDocument();
});

it("should be able to introduce a weight", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");

  expect(weightInput).toHaveValue(2);
});

it("should be able to select a fruit and see its price", async () => {
  render(<App />);

  const watermelonButton = screen.getByLabelText("Sandía");
  await userEvent.click(watermelonButton);

  const priceInput = screen.getByLabelText("Precio:");
  expect(priceInput).toHaveValue(0.93);
});

it("should calculate the total", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);
  const totalInput = screen.getByLabelText("Total:");
  expect(totalInput).toHaveValue(3.38);
});

it("should see an error when you calculate the total without the price", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  await userEvent.click(screen.getByText("Calcular"));

  expect(screen.getByText("Error: precio es requerido")).toBeInTheDocument();
});

it("should clear the error when select a fruit", async () => {
  render(<App />);

  await userEvent.click(screen.getByText("Calcular"));
  await userEvent.click(screen.getByLabelText("Sandía"));

  expect(screen.queryByText("Error")).not.toBeInTheDocument();
});

it("should see an error if there is not weight", async () => {
  render(<App />);

  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  await userEvent.click(screen.getByText("Calcular"));

  expect(screen.getByText("Error: peso es requerido")).toBeInTheDocument();
});

it("should clear the input values", async () => {
  render(<App />);

  const weightInputField = screen.getByLabelText("Peso:");
  await userEvent.type(weightInputField, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);
  const clearButton = screen.getByText("Limpiar");
  await userEvent.click(clearButton);

  const weightInput = screen.getByLabelText("Peso:");
  expect(weightInput).not.toHaveValue();
  const priceInput = screen.getByLabelText("Precio:");
  expect(priceInput).toHaveValue(0);
  const totalInput = screen.getByLabelText("Total:");
  expect(totalInput).toHaveValue(0);
});

it("should add the last weighed price in the sidebar", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toHaveTextContent("3.38 €");
});

it("should create a list with the weighed prices in the sidebar", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);

  await userEvent.clear(weightInput);
  await userEvent.type(weightInput, "4");
  const watermelonButton = screen.getByLabelText("Sandía");
  await userEvent.click(watermelonButton);
  await userEvent.click(calculateButton);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toHaveTextContent("3.38 €");
  expect(sidebar).toHaveTextContent("3.72 €");
});

it("should display the total price of all the weighed prices", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);
  await userEvent.clear(weightInput);
  await userEvent.type(weightInput, "4");
  const watermelonButton = screen.getByLabelText("Sandía");
  await userEvent.click(watermelonButton);
  await userEvent.click(calculateButton);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toHaveTextContent("3.38 €");
  expect(sidebar).toHaveTextContent("3.72 €");
  expect(sidebar).toHaveTextContent("Total - 7.1 €");
});

it("should add the last weighed product and price in the sidebar", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toHaveTextContent("Plátano - 3.38 €");
});

it("should see the product name for each weighed product in the sidebar", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  const calculateButton = screen.getByText("Calcular");
  await userEvent.click(calculateButton);
  await userEvent.clear(weightInput);
  await userEvent.type(weightInput, "4");
  const watermelonButton = screen.getByLabelText("Sandía");
  await userEvent.click(watermelonButton);
  await userEvent.click(calculateButton);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toHaveTextContent("Plátano - 3.38 €");
  expect(sidebar).toHaveTextContent("Sandía - 3.72 €");
});

it("should identify the type of the error when the price is 0", async () => {
  render(<App />);

  const weightInput = screen.getByLabelText("Peso:");
  await userEvent.type(weightInput, "2");
  await userEvent.click(screen.getByText("Calcular"));

  expect(screen.getByText("Error: precio es requerido")).toBeInTheDocument();
});

it("should identify the type of the error when the weight is 0", async () => {
  render(<App />);

  const bananaButton = screen.getByLabelText("Plátano");
  await userEvent.click(bananaButton);
  await userEvent.click(screen.getByText("Calcular"));

  expect(screen.getByText("Error: peso es requerido")).toBeInTheDocument();
});

it.skip("should be able to clean the list", () => {});

it.skip("should be able to remove a product from the list", () => {});

describe("Regression tests", () => {
  it.skip("should not add a product to the list if there is an error");

  it.skip("should see the prices with maximum two decimals");
});
