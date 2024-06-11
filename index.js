'use strict'

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
app.get('/api/v1/cars', (req, res, next) => {
    Car.find({}).lean()
        .then((cars) => {
            if (cars) {
                res.json(cars);
            } else {
                return res.status(404).send('Not Found');
            }
        })
        .catch(err => next(err));
});

app.get('/api/v1/cars/:id', (req, res, next) => {
    Car.findOne({ _id: req.params.id }).lean()
        .then((car) => {
            if (car) {
                res.json(car);
            } else {
                return res.status(404).send('Not Found');
            }
        })
        .catch(err => next(err));
});

app.post('/api/v1/cars', (req, res, next) => {
    Car.updateOne({ _id: req.body._id }, req.body, { upsert: true })
        .then((result) => {
            res.json({ updated: result.nModified });
        })
        .catch(err => next(err));
});

app.delete('/api/v1/cars/:id', (req, res, next) => {
    Car.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.json({ deleted: result.deletedCount });
        })
        .catch(err => next(err));
});

// 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// 500 handler
app.use((err, req, res, next) => {
    console.error(err);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});
