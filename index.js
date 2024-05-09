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






// import express from 'express';
// import { getAll, getItem } from './data.js';

// const app = express();
// app.set('port', process.env.PORT || 3000);
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// const socialMediaCompanies =[{name: "Facebook",yearFounded: "2004", id:1},
// {name: "Twitter",yearFounded: "2006", id:2}

// ]

// // Route for the home page
// app.get('/', (req, res) => {
//   console.log(req.url)
//   res.render('home',{socialMediaCompanies})
  
// });

// app.get('/socialMediaCompanies/:id', (req, res) => {
//   let socialMediaCompanies = socialMediaCompanies.find(socialMediaCompanies => socialMediaCompanies.id ==
//     req.params.id)
//     if (socialMediaCompanies){
//   res.send('info for Social media companies: ${socialMediaCompanies.name});
//     }
// });
// app.get('/about', (req, res) => {
//   console.log(req.url)
//   res.send('This social media company going to sell stock sson!')
  
// });

// // define 404 handler
// app.get((req, res) => {
//   res.status = 404;
//   res.send('404 Not Found');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// import express from 'express';
// import { getAll, getItem } from './data.js';

// const app = express();
// app.set('port', process.env.PORT || 3000);
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// const socialMediaCompanies = [
//   { name: "Facebook", yearFounded: "2004", id: 1 },
//   { name: "Twitter", yearFounded: "2006", id: 2 }
// ];

// // Route for the home page
// app.get('/', (req, res) => {
//   console.log(req.url);
//   res.render('home', { socialMediaCompanies });
// });

// // Route for getting information about a specific social media company
// app.get('/socialMediaCompanies/:id', (req, res) => {
//   const socialMediaCompany = socialMediaCompanies.find(company => company.id === parseInt(req.params.id));
//   if (socialMediaCompany) {
//     res.send(`Information for Social media company: ${socialMediaCompany.name}`);
//   } else {
//     res.status(404).send('Social media company not found');
//   }
// });

// // Route for the about page
// app.get('/about', (req, res) => {
//   console.log(req.url);
//   res.send('This social media company is going to sell stock soon!');
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).send('404 Not Found');
// });

// app.listen(app.get('port'), () => {
//   console.log('Express started');
// });
// import express from 'express';
// import { getAll, getItem } from './employeesData.js';

// const app = express();
// app.set('port', process.env.PORT || 3000);
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// // Route for the home page
// app.get('/', (req, res) => {
//   console.log(req.url);
//   res.render('home');
// });

// // Route for getting information about a specific person
// app.get('/employees/:name', (req, res) => {
//   const person = getItem('name', req.params.name);
//   if (person) {
//     res.json(person);
//   } else {
//     res.status(404).send('Employee not found');
//   }
// });

// // Route to get all employees
// app.get('/employees', (req, res) => {
//   const employees = getAll();
//   res.json(employees);
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).send('404 Not Found');
// });

// app.listen(app.get('port'), () => {
//   console.log('Express server started and listening on port ' + app.get('port'));
// });


