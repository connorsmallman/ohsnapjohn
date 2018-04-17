const express = require('express');
const app = express();
const webshot = require('webshot');
const fs = require('fs');
const Readable = require('stream').Readable;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/snap', function (req, res) { 
  webshot(req.query.url, { shotSize: { height: 'all' }}, function(err, stream) {
    if(err) return console.log(err);

    const readableStream = new Readable().wrap(stream);

    res.attachment(`${req.query.url}.png`);

    readableStream.pipe(res);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});