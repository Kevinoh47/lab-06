'use strict';

const superagent = require('superagent');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// database API can be found here:
const API = process.env.API_URL || 'http://localhost:3000';

// set up EJS as web server templating engine
app.set('view engine', 'ejs');

// public folder serves static assets:
app.use(express.static('./public'));

// routes
app.get('/', homePage);

app.get('/products', productsPage);

app.get('/categories', categoriesPage);

app.get('/category/:id', categoryProductsPage);

// helper callbacks
function homePage (req, res) {
  res.render(
    'site', 
    {
      page:'./pages/home', 
      title:'HDGS Home Page',
    }
  );
}

function productsPage (req, res) {
  superagent.get(`${API}/products`)
    .then(data => {
      res.render(
        'site', 
        {
          products:data.body, 
          page:'./pages/products', 
          title:'HDGS Products',
        }
      );
    });
}

function categoriesPage (req, res) {
  superagent.get(`${API}/categories`)
    .then(data => {
      console.log('category data', data.body);
      res.render(
        'site', 
        {
          categories:data.body, 
          page:'./pages/categories', 
          title:'HDGS Product Categories',
        }
      );
    });
}

function categoryProductsPage (req, res) {
  superagent.get(`${API}/products`)
    .query(`category=${req.params.id}`)
    .then(data => {
      // console.log('category products data', data.body); TODO remove
      res.render(
        'site',
        {
          products:data.body,
          page:'./pages/categoryProducts',
          title:'HDGS Products by Category',
        }
      );
    });
}



// listener
app.listen(PORT, () => {`Web server listening on PORT ${PORT}`;});