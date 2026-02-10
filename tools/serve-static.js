#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const portArg = args.find((arg) => arg.startsWith("--port="));
const port = portArg ? Number(portArg.split("=")[1]) : 4173;
const once = args.includes("--once");
const check = args.includes("--check");

const filePath = path.join(__dirname, "..", "apps", "web", "static-demo.html");

if (check) {
  if (!fs.existsSync(filePath)) {
    console.error("static-demo.html not found.");
    process.exit(1);
  }
  console.log("Static demo file found.");
  process.exit(0);
}

const server = http.createServer((req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Unable to load demo.");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
    if (once) {
      server.close();
    }
  });
});

server.listen(port, () => {
  console.log(`Static demo running at http://localhost:${port}`);
});
