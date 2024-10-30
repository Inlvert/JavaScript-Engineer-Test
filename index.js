const http = require("http");
const app = require("./app.js");
const CONSTANTS = require("./constants.js");

const server = http.createServer(app);

const PORT = CONSTANTS.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
