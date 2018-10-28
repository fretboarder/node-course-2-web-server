const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// custom middleware for logging
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unabl to append to server.log')
        }
    })
    next()
})

// custom middleware for maintenance
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance'
    })
})

// middleware 'static'
app.use(express.static(__dirname + '/public'))

// Handlebars helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (t) => t.toUpperCase())

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        message: 'Welcome darling!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.listen(3000, () => {
    console.log('Server up and running on port 3000')
})