'use strict'

import express from 'express';
import hbs from "hbs"
import { Car } from "./models/car.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

// app.engine('hbs', hbs({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    Car.find({}).lean()
        .then((cars) => {
            res.render('home', { cars });
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req,res,next) => {
    Car.findOne({ title:req.query.title }).lean()
        .then((car) => {
            res.render('details', {result: car} );
        })
        .catch(err => next(err));
});

app.post('/detail', (req,res, next) => {
    Car.findOne({ title:req.body.title }).lean()
        .then((car) => {
            res.render('details', {result: car} );
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



app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});
