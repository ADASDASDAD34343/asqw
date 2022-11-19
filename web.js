var WhatapAgent = require('whatap').NodeAgent;
var express = require('express');
var app = express();

const mysql = require('mysql');





const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Comments = sequelize.define('Comments', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
});

(async () => {
await Comments.sync();
})();
app.use('/static', express.static(__dirname + '/html'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
express.static('html')

app.get('/Bulletinboard', async function(req, res) {
  const comments = await Comments.findAll();
  res.render('index',{ comments: comments});
});

app.post('/create', async function(req, res) {
  const { content } = req.body
  await Comments.create({ content: content });
  res.redirect('/Bulletinboard')
});

app.post('/update/:id', async function(req, res) {
  const { content } = req.body
  const { id } = req.params
  await Comments.update({ content: content }, {
    where: {
      id: id
    }
  });
  res.redirect('/Bulletinboard')
});

app.post('/delete/:id', async function(req, res) {
  const { id } = req.params
  await Comments.destroy({
    where: {
      id: id
    }
  });
  res.redirect('/Bulletinboard')
});

app.get('/adminlogin', async function(req, res) {
  
  res.render("adminlogin.ejs");
})



app.get('/admin', async function(req, res) {
  
  res.render("admin.ejs");
})

app.get('/robots.txt', async function(req, res) {
  
 

  res.sendFile( __dirname + '/robots.txt')
})

app.get('/sitemap.xml', async function(req, res) {
  
  
  res.sendFile( __dirname + '/sitemap.xml')
})
app.get('/', async function(req, res) {

  
  res.sendFile( __dirname + '/html/index.html')
})
app.get('/kl', async function(req, res) {

  
  res.sendFile( __dirname + '/html/kl.html')
})

app.get('/Shopping', async function(req, res) {

  
  res.sendFile( __dirname + '/html/t.html')
})
app.get('/t', async function(req, res) {

  
  res.sendFile( __dirname + '/html/t.html')
})

app.get('/Login', async function(req, res) {

  
  res.sendFile( __dirname + '/html/Login.html')
})
app.listen(8080);
console.log('Server is listening on port 8080');


