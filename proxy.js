// var http = require('http'),
//     httpProxy = require('http-proxy');
// //
// // Create your proxy server and set the target in the options.
// //
// httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(8000); // See (†)

// //
// // Create your target server
// //
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(9000);

// const http = require('http');
// const url = require('url');
// // const Tls = require('tls');

// // const req = http.request({
// //     host: '127.0.0.1',
// //     port: 3128,
// //     method: 'GET',
// //     path: '/',
// // });

// // req.on('connect', function (res, socket, head) {
// //     var cts = Tls.connect({
// //     host: '127.0.0.1',
// //     socket: socket
// //     }, function () {
// //         cts.write('GET / HTTP/1.1rnHost: twitter.comrnrn');
// //     });

// //     cts.on('data', function (data) {
// //         console.log(data.toString());
// //     });
// // });

// // req.end();


// // var req = http.request({
// //     host: '127.0.0.1',
// //     port: 5984,
// //     method: 'GET',
// //     path: '/'
// // }, (res) => {
// //     res.on('data', (data) => {
// //         console.log(data.toString());
// //     });
// // });

// // req.end();

// const notFound = ( res ) => {
//     res.writeHead(404, "text/plain");
//     res.end("404: File not found");
// }


// http.createServer( (b_req, b_res) => {
//     // Parse the request's url
//     const b_url = url.parse(b_req.url, true);
//     if (!b_url.query || !b_url.query.url) return notFound(b_res);

//     // Read and parse the url parameter (/?url=p_url)
//     const p_url = url.parse(b_url.query.url);

//     // Initialize HTTP Client
//     const p_client = http.request(p_url.port || 80, p_url.hostname);

//     // Send Request
//     const p_req = p_client.request('GET', p_url.pathname || '/', {
//         host: p_url.hostname
//     });
//     p_req.end();

//     // Listen for response
//     p_req.addListener('response', (p_res) => {
//         // Pass through headers
//         b_res.writeHead(p_res.statusCode, p_res.headers);

//         // Pass through data
//         p_res.addListener('data', (chunk) => {
//             b_req.res.write(chunk);
//             b_res.end();
//         });
//     });
// }).listen(3090, "127.0.0.1");

// console.log('Server running at http://127.0.0.1:3090/');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3111;

app.use(morgan('dev'));

app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
})