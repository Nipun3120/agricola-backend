require("dotenv").config();
const db = require("./config/database");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(express.json({ strict: true }));

app.use(require("./controllers"));

// setting port
const port = process.env.PORT || 4000;

// server listening
server.listen(port, async () => {
  console.log('initializing...')
  await db.connect()
  console.log(`Server running on port ${port}`);
});
