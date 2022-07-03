const app = require("./app")
const server = require("http").createServer(app);

const dotenv = require("dotenv");
dotenv.config();

server.listen(process.env.PORT, () => {
  console.log("Good-job server is running on PORT =", process.env.PORT, ", ENVIRONMENT =", process.env.NODE_ENV);
});