'use strict';

import express from 'express';
import hbs from "hbs";
import { Car } from "./models/car.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

import cors from 'cors';
app.use(cors()); // Enable CORS for all routes

app.set("view engine", "hbs");

// Register JSON helper
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

// Web routes
app.get('/', (req, res, next) => {
    Car.find({}).lean()
        .then((cars) => {
            res.render('home_react', { cars });
        })
        .catch(err => next(err));
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req, res, next) => {   
    Car.findOne({ _id: req.query.id }).lean()
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

// API routes
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find({}).lean();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

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

app.post('/api/cars', async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add car' });
    }
});

app.put('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update car' });
    }
});

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

// Error handling middleware
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log('Express started on port', app.get('port'));
});

    