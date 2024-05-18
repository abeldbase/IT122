'use strict';
var car = require("../models/car");

// export MongoDb methods as promise functions
exports.getAll = () => {
    // find all documents 
    console.log('getAll');
    return car.find({}, (err, result) => {
        // output error if one occurred
        if (err) {
            console.log(err);
        } else {
            // otherwise output the array of documents
            return result;
        }
    });
};

exports.get = (model) => {
    return car.find((item) => {
        return item.model.toLowerCase() === model.toLowerCase();
    });
};

exports.delete = (model) => {
    // retain array length for later comparison after array modification
    const oldLength = car.length;
    car = car.filter((item) => {
        return item.model !== model;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== car.length, total: car.length };
};

exports.add = (newCar) => {
    const oldLength = car.length;
    // use existing get() method to check if car already in our list
    let found = this.get(newCar.model);
    if (!found) {
        car.push(newCar);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== car.length, total: Car.length };
};
