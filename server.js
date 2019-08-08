const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res) {
    apiProxy.web(req, res, {
        target: 'http://localhost:8001'
    });    
});    




app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
