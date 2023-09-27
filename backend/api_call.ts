const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

app.use(bodyParser.json());

// Define an endpoint to handle the data and run the Python script
app.post('/run-python-script', (req, res) => {
  const { inputData } = req.body;

  // Replace 'your_script.py' with the path to your Python script
  exec(`python your_script.py ${inputData}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ success: false, error: stderr });
    }

    const pythonOutput = stdout.trim(); // Trim any extra whitespace

    res.json({ success: true, output: pythonOutput });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
