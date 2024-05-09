// employeesData.js

const employees = [
  {
    id: 1,
    name: "Abebe Kebede",
    age: 30,
    jobTitle: "Software Engineer",
    department: "Engineering",
    salary: 80000
  },
  {
    id: 2,
    name: "Meseret Tadesse",
    age: 28,
    jobTitle: "Marketing Manager",
    department: "Marketing",
    salary: 75000
  },
  {
    id: 3,
    name: "Alemayehu Alemu",
    age: 35,
    jobTitle: "Finance Analyst",
    department: "Finance",
    salary: 85000
  },
  {
    id: 4,
    name: "Yohannes Assefa",
    age: 33,
    jobTitle: "Human Resources Specialist",
    department: "Human Resources",
    salary: 70000
  },
  {
    id: 5,
    name: "Zewdu Bekele",
    age: 32,
    jobTitle: "Sales Manager",
    department: "Sales",
    salary: 90000
  },
  {
    id: 6,
    name: "Mulualem Tilahun",
    age: 29,
    jobTitle: "Product Manager",
    department: "Product Management",
    salary: 82000
  },
  {
    id: 7,
    name: "Almaz Gebre",
    age: 31,
    jobTitle: "Operations Supervisor",
    department: "Operations",
    salary: 78000
  },
  {
    id: 8,
    name: "Genet Tekle",
    age: 34,
    jobTitle: "Customer Service Representative",
    department: "Customer Service",
    salary: 60000
  },
  {
    id: 9,
    name: "Tadele Lemma",
    age: 27,
    jobTitle: "Graphic Designer",
    department: "Creative",
    salary: 65000
  },
  {
    id: 10,
    name: "Wondimu Abate",
    age: 36,
    jobTitle: "Quality Assurance Analyst",
    department: "Quality Assurance",
    salary: 72000
  }
];

// Function to get all employees
export function getAll() {
  return employees;
}

// Function to get an employee by id
// export function getItem(value) {
//   return employees.find(employee => employee.id === value);
// }
export function getItem(id) {
  return employees.find((employee) => {
    return employee.id === id;
  });
}


  