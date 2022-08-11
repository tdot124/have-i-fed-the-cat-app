const express = require('express');
const { Cat } = require('./models')

const app = express();

app.use(express.json());

app.post('/cats', (req, res) => {
    Cat.create(req.body).then(cat => res.status(201).json(cat)).catch(err => res.status(400).json('error'))
})

app.get('/cats', (req, res) => {
    Cat.findAll({ where: req.query }).then(cat => res.status(200).json(cat)).catch(err => res.status(400).json('error'))
})

app.get('/cats/:catId', (req, res) => {
    Cat.findByPk(req.params.catId).then(cat => res.status(200).json(cat)).catch(err => res.status(400).json('error'))
})

app.patch('/cats/:catId', (req, res) => {
    Cat.update(req.body, { where: { id: req.params.catId}}).then(cat => res.status(204).json(cat)).catch(err => res.status(400).json('error'))
})

app.delete('/cats/:catId', (req, res) => {
    Cat.destroy( { where: { id: req.params.catId}}).then(cat => res.status(204).json(cat)).catch(err => res.status(400).json('error'))
})

app.patch('/feed/:catId', (req, res) => {
    Cat.update({ lastFed: new Date() }, { where: { id: req.params.catId}}).then(cat => res.status(204).json(cat)).catch(err => res.status(400).json('error'))
})




module.exports = app;