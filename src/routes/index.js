// src/routes/index.js

const express = require('express');
// Our authentication middleware
const { authenticate } = require('../auth');
// version and author from package.json
const { version, author } = require('../../package.json');

// require from src/response.js to use createSuccessResponse
const {createSuccessResponse} = require('../response');

// Create a router that we can use to mount our API
const router = express.Router();

const { hostname } = require('os');

/**
 * Expose all of our API routes on /v1/* to include an API version.
 */
// updated: 
// router.use(`/v1`, require('./api'));
router.use(`/v1`, authenticate(), require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader('Cache-Control', 'no-cache');

  // Send a 200 'OK' response
  // rewrite HTTP responses to use the createSuccessResponse()
  res.status(200).json(
    createSuccessResponse({
      author,
      githubUrl: 'https://github.com/rezi410/fragments',
      version,
      // Include the hostname in the response
      hostname: hostname(),
    })
  );
});

module.exports = router;