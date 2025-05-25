const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());

// Serve a colorful HTML page at the root URL
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Educhain CRUD BACKEND...</title>
        <style>
          body {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: #fff;
            font-family: 'Segoe UI', Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            font-size: 3em;
            letter-spacing: 2px;
            text-shadow: 2px 2px 8px #00000055;
            margin-bottom: 0.5em;
          }
          .desc {
            font-size: 1.2em;
            background: rgba(255,255,255,0.15);
            padding: 1em 2em;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <h1>Educhain CRUD BACKEN...</h1>
        <div class="desc">Welcome to the Educhain backend API server!</div>
      </body>
    </html>
  `);
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect('mongodb+srv://adelekem600:Michadek23@betsmart.rn0nb.mongodb.net/?retryWrites=true&w=majority&appName=BetSmart')
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
