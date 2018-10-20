const request = require('supertest');
const express = require('express');
const app = express();

app.get('/', homePage);

function homePage (req, res) {
  res.render(
    'site', 
    {
      page:'./pages/home', 
      title:'HDGS Home Page',
    }
  );
}

request(app)
  .get('/')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });