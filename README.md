Here are the instructions on how to run the various npm scripts I've created in the `package.json`:

1. **Lint**:
   To run the lint script, open the terminal or command prompt, navigate to the project directory, and then run the following command:
   ```
   npm run lint
   ```
   This will run ESLint to check the JavaScript files in the `src` directory according to the configuration specified in `eslint.config.mjs`.

2. **Start**:
   To start the server normally, run:
   ```
   npm start
   ```
   This will execute the `node src/server.js` command, which starts the server without any additional features like watching for file changes or debugging.

3. **Dev**:
   To start the server with nodemon, which watches the `src/**` folder for any changes and restarts the server automatically, run:
   ```
   npm run dev
   ```
   This will set the `LOG_LEVEL` environment variable to `debug` and then execute `nodemon ./src/server.js --watch src`.

4. **Debug**:
   To start the server with nodemon and the Node.js inspector enabled on port 9229, allowing you to attach a debugger like VSCode, run:
   ```
   npm run debug
   ```
   This will also set the `LOG_LEVEL` environment variable to `debug` and then execute `nodemon --inspect=0.0.0.0:9229 ./src/server.js --watch src`.

