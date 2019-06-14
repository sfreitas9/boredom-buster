const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// parse application/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api/news',(req,res) => {
  /* NOTE:  News API can only be used 10 times in 24 hours */
  console.log("key", process.env.REACT_APP_API_KEY);
  axios
    .get('https://api.currentsapi.services/v1/latest-news', {
      headers: {'Authorization': process.env.REACT_APP_API_KEY}
    }).then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(404).send('News not found: ' + error);
    });
});

app.get('/api/music*',(req, res) => {
  let url = `https://openwhyd.org/hot/${req.query.genre.toLowerCase()}?format=json`;
  axios
    .get(url)
    .then(response => {   
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(404).send('Music not found: ' + error);
    });
});

app.get('*',(req, res) => {
  res.status(404).send('Not found');
});

module.exports = app;
