import { car } from "./models/car.js";

// return all records
Car.find({}).lean()
  .then((cars) => {
    console.log(cars);
  })
  .catch(err => console.log(err));