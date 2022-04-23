const express = require('express');
const serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
const port = 5000;

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}/`);
 });