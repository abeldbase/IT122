// Importing modules using ES module syntax
import express from 'express';
import cors from 'cors';
import { Car } from './models/car.js';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Used to parse JSON bodies

app.use(cors()); // Enable CORS for all routes

app.set('view engine', 'ejs'); // Set view engine to EJS

// Web routes
app.get('/', async (req, res, next) => {
    try {
        const cars = await Car.find().lean();
        res.render('home', { cars });
    } catch (err) {
        next(err);
    }
});

app.get('/detail', async (req, res, next) => {
    try {
        const car = await Car.findOne({ _id: req.query.id }).lean();
        res.render('details', { result: car });
    } catch (err) {
        next(err);
    }
});

app.get('/delete', async (req, res, next) => {
    try {
        const result = await Car.deleteOne({ model: req.query.model });
        let deleted = result.deletedCount !== 0;
        const total = await Car.countDocuments();
        res.type('text/html');
        res.render('delete', { model: req.query.model, deleted, total });
    } catch (err) {
        next(err);
    }
});

// REST API routes

// Get all items
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find().lean();
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

// Add or update one or more item
app.post('/api/cars', async (req, res) => {
    const { id, brand, model, year, color } = req.body;

    // Check if the request body contains an array of cars
    if (Array.isArray(req.body)) {
        try {
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
                car = await Car.findByIdAndUpdate(id, { brand, model, year, color }, { new: true, upsert: true }).lean();
            } else {
                car = new Car({ _id: Math.floor((Math.random() * 1000000)), brand, model, year, color });
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
