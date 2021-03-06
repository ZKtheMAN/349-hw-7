var http = require('http');
var fs = require('fs');
var path = require('path');

var extract = require('./extract');
var wss = require('./websockets-server');

var handleError = function (err, res) {
    res.writeHead(404);
    res.end();
};

var server = http.createServer(function (req, res) {
    console.log("Responding to request.");
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            handleError(err, res);
        } else res.end(data);
    });
});

server.listen(3000);