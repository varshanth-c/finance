const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI('AIzaSyCOYyZi7d_KPBvRKSzlKW13ablRrGl96BU');

app.post('/simple-gemini-chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get Gemini response', details: err.message });
  }
});

app.listen(5050, () => {
  console.log('Simple Gemini Chat backend running on port 5050');
});
