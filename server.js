const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
const appRoutes = require('./app/routes/api')(router);
const path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

// Replace with your MongoDB connection string
const dbURI = 'mongodb://localhost:27017/uas-projek';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('Database connection error:', err));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/home.html'));
});

app.listen(port, function() {
  console.log('Running the server on port ' + port);
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);
