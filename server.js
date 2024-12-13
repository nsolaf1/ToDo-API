require('dotenv').config();
const express = require('express');
const pool = require('./db');
const app = express();


app.use(express.json()); 

// Create a Todo
app.post('/todos', async (req, res) => {
  const { id, text, completed } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todo (id, text, completed) VALUES ($1, $2, $3) RETURNING *',
      [id, text, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get All Todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todo');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get a Single Todo by ID
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM todo WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update a Todo by ID
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const result = await pool.query(
      'UPDATE todo SET text = $1, completed = $2 WHERE id = $3 RETURNING *',
      [text, completed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete a Todo by ID
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM todo WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
//Sample run to create a post 
// Create a Todo with Sample Data on Demand
app.post('/todos/sample', async (req, res) => {
  const sampleText = "Sample Task " + new Date().toISOString(); 
  const sampleCompleted = Math.random() > 0.5; 
  try {
    const result = await pool.query(
      'INSERT INTO todo (text, completed) VALUES ($1, $2) RETURNING *',
      [sampleText, sampleCompleted]
    );
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
