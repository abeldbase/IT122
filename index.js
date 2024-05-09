// index.js

import express from 'express';
import { getAll, getItem } from './employeesData.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded()); // Parse URL-encoded bodies


// Route for the home page
app.get('/', (req, res) => {
  const employees = getAll();
  res.render('home', { employees });
});

// Route for the detail page
app.get('/detail', (req, res) => {
  const id = req.query.id;
  console.log(typeof id)
  const employee = getItem(Number(id));
  console.log(employee)
  if (employee) {
    res.render('detail', { employee });
  } else {
    res.status(404).send('Employee not found');
  }
});

app.listen(PORT, () => {
  console.log(`Express server started and listening on port ${PORT}`);
});








