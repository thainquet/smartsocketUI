const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path')

var app = express()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('PORT', process.env.PORT || 7777);

app.get('/', (req, res) => {
    res.sendFile('homepage.html', { root: path.join(__dirname, '/public/')} )
})


app.listen(app.get('PORT'), () => console.log('success'))