const express = require('express')
const path = require('path')
const hbs = require('hbs')
const gutil = require('./geocode.js')
    // we need to do this to user express
const app = express()
const port = process.env.Port || 3000
    // setting path
const vpath = path.join(__dirname, '../templates/views')
const prtpath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', vpath)
hbs.registerPartials(prtpath)
const dirpath = path.join(__dirname, '../public')


app.use(express.static(dirpath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        page: 'help'
    })
})
app.get('/about', (req, res) => {
    res.send()
})
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        res.send({
            msg: 'Please provide an address.',
            location: 'Not given',
            forecast: 'Unavailable'
        })
    } else {
        gutil.getgeocode(address, (error, { lat, log, loc } = {}) => {
            if (error) {
                res.send({
                    msg: error,
                    forecast: 'Unavailable',
                    location: address
                })
            } else {
                gutil.gettempdata(lat, log, (error, { temp } = {}) => {
                    if (error) {
                        res.send({
                            msg: error,
                            forecast: 'Unavailable',
                            location: add
                        })
                    } else {
                        res.send({
                            msg: '',
                            forecast: "The temperature in " + loc + " is " + temp,
                            location: loc
                        })
                    }
                })
            }
        })

    }
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide search terms'
        })
    } else {
        res.send({
            products: []
        })
    }

})

app.get('/help/*', (req, res) => {
    res.send('This help page do not exists. 404.')
})
app.get('*', (req, res) => {
    res.send('This page do not exists. 404.')
})
app.listen(port, () => {
    console.log('Server is up... ' + port)
})