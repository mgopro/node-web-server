const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast');
const geocode = require('./utils/geocode');

const app = express()
const port = process.env.PORT || 3000

// console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Mithil Majety'
    });
    // res.send('<h1>Weather</h1>')
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Mithil Majety'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        content: 'If you need help, you have reached the correct place.',
        name: 'Mithil Majety'
    })
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Andrew'
//     },
//     {
//         name: 'Sarah'
//     }
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }
    const address = req.query.address
    geocode(address, (error, {Longitude, Latitude, Location} = {}) => {
        if (error){
            return res.send({error});
        }
        forcast(Longitude, Latitude, (error, forcastData) => {
            if (error){
                return res.send({error});
            }
            res.send({
                forcast:forcastData,
                location: Location,
                address: address
            })
        })
        
    })

    // res.send([{
    //     forcast:'Rainy. It is 40 degrees outside. It feels like 30 degrees.'
    // },{
    //     location: req.query.address
    // }])
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({error:'You must provide a search term'})
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{title: 'Page Not Found',
    errorMessage: 'Help article not found',
    name: 'Mithil Majety'})
    // res.send('Help article not found')
})

app.get('*',(req,res)=>{
    res.render('404',{title: 'Page Not Found',
    errorMessage: 'The page you are looking for does not exist.',
    name: 'Mithil Majety'})
    // res.send('page not found')
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port+'.')
})