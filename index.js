'use strict'

import express from 'express';
import hbs from "hbs"
import { Car } from "./models/car.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

import cors from 'cors';
app.use(cors()); // Enable CORS for all routes

app.set("view engine", "hbs");

// Web routes
app.get('/', (req, res, next) => {
    Car.find({}).lean()
        .then((cars) => {
            res.render('home', { cars });
        })
        .catch(err => next(err));
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req, res, next) => {
    Car.findOne({ title: req.query.title }).lean()
        .then((car) => {
            res.render('details', { result: car });
        })
        .catch(err => next(err));
});

app.post('/detail', (req, res, next) => {
    Car.findOne({ title: req.body.title }).lean()
        .then((car) => {
            res.render('details', { result: car });
        })
        .catch(err => next(err));
});

app.get('/delete', async (req, res, next) => {
    try {
        const result = await Car.deleteOne({ title: req.query.title });
        let deleted = result.deletedCount !== 0; // deletedCount will be 0 if no docs deleted
        const total = await Car.countDocuments();
        res.type('text/html');
        res.render('delete', { title: req.query.title, deleted: deleted, total: total });
    } catch (err) {
        next(err);
    }
});

// REST API routes

// Get all items
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find({}).lean();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

// Get a single item
app.get('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).lean();
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch car' });
    }
});

// Delete an item
app.delete('/api/cars/:id', async (req, res) => {
    try {
        const result = await Car.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: 'Car deleted' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete car' });
    }
});

// Add or update one or more  item
app.post('/api/cars', async (req, res) => {
    const { id, brand, model, year, color } = req.body;

    // Check if the request body contains an array of cars
    if (Array.isArray(req.body)) {
        try {
            // Insert multiple cars
            const result = await Car.insertMany(req.body);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Failed to add cars' });
        }
    } else {
        // Handle single car addition or update
        if (!brand || !model || !year || !color) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            let car;
            if (id) {
                // Update existing car if ID is provided
                car = await Car.findByIdAndUpdate(id, { brand, model, year, color }, { new: true, upsert: true }).lean();
            } else {
                // Add new car if no ID is provided
                car = new Car({ brand, model, year, color });
                await car.save();
            }
            res.json(car);
        } catch (err) {
            res.status(500).json({ error: 'Failed to add or update car' });
        }
    }
});


// Error handling
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});
