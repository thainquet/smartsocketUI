const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path')

const mqtt = require('mqtt')
const options = {
    port: 13979,
    host: 'mqtt://tailor.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'rqqffbzy',
    password: '4mOEPlditjHD',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

var app = express()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('PORT', process.env.PORT || 7777);
app.get('/temp=:temp&hum=:hum', (req, res) => {
    req.setEncoding('utf8');
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end(req.params.temp + '°C --- ' + req.params.hum + ' %')
})
app.get('/test', async (req, res) => {
    const client = await mqtt.connect('mqtt://tailor.cloudmqtt.com', options)
    let data = []
    await client.on('connect', function () { // When connected
        console.log('connected');
        // subscribe to a topic
        client.subscribe('status', function () {
            client.on('message', function (topic, msg, pkt) {
                console.log(JSON.parse(msg))
                let json = JSON.parse(msg);
                client.end();
                res.send("status: " + json.toString())
            });
        });
    });
    // await res.send(data)
})

app.get('/', (req, res) => {
    res.sendFile('homepage.html', { root: path.join(__dirname, '/public/')} )
})


app.listen(app.get('PORT'), () => console.log('success'))