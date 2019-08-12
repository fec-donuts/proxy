const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy');
const bodyParser = require('body-parser');

const apiProxy = proxy.createProxyServer();

const app = express();

const port = process.env.PORT || 3111;


const serverPorts = [   {path: '/pd', server: 'http://localhost:8000/pd'}, 
                        {path: '/grabItems', server:'http://localhost:3010/grabItems'}, 
                        {path: '/ratings', server:'http://localhost:4001/ratings'}, 
                        {path: '/singleObj', server:'http://localhost:5431/singleObj'}, 
                        {path: '/sponsored', server:'http://localhost:3333/sponsored'}, 
                        {path: '/Questions', server:'http://localhost:4008/Questions'}
                    ]


serverPorts.map( singlePort => {
    app.use(singlePort.path, (req, res) => {
        apiProxy.web( req, res, {
            target: singlePort.server
        })
    })
})


app.use(morgan('dev'));

app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
})
