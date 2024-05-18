const cars = [
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
  ]
  


export function getAll() {
  return cars;
}

// Function to get car by id
// export function getItem(value) {
//   return cars.find(car => car.id === value);
// }
export function getItem(id) {
  return cars.find((car) => {
    return car.id === id;
  });
}



  