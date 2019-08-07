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

const http = require('http');
const url = require('url');

// const request = http.request({
//     port: 3090,
//     host: '127.0.0.1',
//     method: 'PUT',
//     path: '/johnTest'
// });

const notFound = ( res ) => {
    res.writeHead(404, "text/plain");
    res.end("404: File not found");
}


http.createServer( (b_req, b_res) => {
    // Parse the request's url
    const b_url = url.parse(b_req.url, true);
    if (!b_url.query || !b_url.query.url) return notFound(b_res);

    // Read and parse the url parameter (/?url=p_url)
    const p_url = url.parse(b_url.query.url);

    // Initialize HTTP Client
    const p_client = http.request(p_url.port || 80, p_url.hostname);

    // Send Request
    const p_req = p_client.request('GET', p_url.pathname || '/', {
        host: p_url.hostname
    });
    p_req.end();

    // Listen for response
    p_req.addListener('response', (p_res) => {
        // Pass through headers
        b_res.writeHead(p_res.statusCode, p_res.headers);

        // Pass through data
        p_res.addListener('data', (chunk) => {
            b_req.res.write(chunk);
            b_res.end();
        });
    });
}).listen(3090, "127.0.0.1");

console.log('Server running at http://127.0.0.1:3090/');