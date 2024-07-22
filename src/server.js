// src/server.js

// We want to gracefully shutdown our server
const stoppable = require('stoppable');

// Get our logger instance
const logger = require('./logger');

// Get our express app instance
const app = require('./app');

// Get the desired port from the process' environment. Default to `8080`
const port = parseInt(process.env.PORT || '8080', 10);


// Todo: print all of the process' environment variables
// if (process.env.LOG_LEVEL === 'debug') {
//   console.log("Environment Variables:");
//   for (const key in process.env) {
//     console.log(`${key}: ${process.env[key]}`);
//   }
// }

// // Alternative to print "environment variables" for the code above
// if (process.env.LOG_LEVEL == 'debug') {
//   logger.info(process.env, 'Environment Variables');
// }



// Start a server listening on this port
const server = stoppable(
  app.listen(port, () => {
    // Log a message that the server has started, and which port it's using.
    logger.info(`Server started on port ${port}`);
  })
);

// Export our server instance so other parts of our code can access it if necessary.
module.exports = server;