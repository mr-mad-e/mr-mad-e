const express = require('express')
const app = express()

app.use(express.static(__dirname + '/'))
app.use(express.json())

let db

const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'myproject'

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server")
    db = client.db(dbName)
})

app.get('/', function (req, res) {
    res.sendFile('index.html')
})

app.get('/words', function (req, res) {
    db.collection('words').find().toArray(function (err, docs) {
        res.json(docs)
    })
})

// POST method route
app.post('/words', function (req, res) {
    if (req.body.value) {
        req.body.value.split(' ').forEach(value => {
            db.collection('words').updateOne({
                _id: value.toLowerCase().trim()
            }, {
                $inc: {
                    count: 1
                }
            }, {
                upsert: true
            }, function (err, result) {})
        })
        res.json(true)
    } else {
        res.json(false)
    }
})

app.listen(3000)
console.log('http://localhost:3000/')