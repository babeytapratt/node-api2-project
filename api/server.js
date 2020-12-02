const express = require('express');
const cors = require('cors');
const server = express();

// import posts router into server.js
const postsRouter = require('./posts/posts-router');

server.use(cors()); // takes care of cors errors

server.use(express.json()); // if req has json in body, it can be parsed and put inside req.body

server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Posts API</h2>
        <p>Welcome to the Lambda Posts API</p>
        `);
});

module.exports = server
