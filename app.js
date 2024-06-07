import React from 'react';

function CarCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function CarRow({ car }) {
  const name = car.brand + ' ' + car.model;

  return (
    <tr>
      <td>{name}</td>
      <td>{car.year}</td>
      <td>{car.color}</td>
    </tr>
  );
}

function CarTable({ cars }) {
  const rows = [];
  let lastCategory = null;

  cars.forEach((car) => {
    if (car.brand !== lastCategory) {
      rows.push(
        <CarCategoryRow
          category={car.brand}
          key={car.brand} />
      );
    }
    rows.push(
      <CarRow
        car={car}
        key={car._id} />
    );
    lastCategory = car.brand;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Year</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableCarTable({ cars }) {
  return (
    <div>
      <CarTable cars={cars} />
    </div>
  );
}

const CARS = [
  {
    _id: "664324fb4673bf6a499d107e",
    brand: "Toyota",
    model: "Corolla",
    year: "2022",
    color: "Silver"
  },
  {
    _id: "664325424673bf6a499d107f",
    brand: "Toyota",
    model: "RAV4",
    year: "2022",
    color: "Silver"
  },
  {
    _id: "664325924673bf6a499d1080",
    brand: "Toyota",
    model: "Sienna",
    year: "2022",
    color: "Black"
  },
  {
    _id: "664325aa4673bf6a499d1081",
    brand: "Toyota",
    model: "Tacoma",
    year: "2022",
    color: "Yellow"
  },
  {
    _id: "664325c34673bf6a499d1082",
    brand: "Toyota",
    model: "Tundra",
    year: "2022",
    color: "Orange"
  },
  {
    _id: "664325dc4673bf6a499d1083",
    brand: "Toyota",
    model: "4Runner",
    year: "2022",
    color: "Brown"
  },
  {
    _id: "664325f64673bf6a499d1084",
    brand: "Toyota",
    model: "Avalon",
    year: "2022",
    color: "Purple"
  }
];

export default function App() {
  return <FilterableCarTable cars={CARS} />;
}

