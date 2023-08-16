const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 

const dbFilePath = path.join(__dirname, '/db.json');

app.get('/customers', async (req, res) => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf-8');
    // console.log(JSON.parse(data));
    const customers = data;
    console.log(customers);
    res.customers;
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add other routes for CRUD operations as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
