const express = require('express');
const app = express();

app.use(require('./user.js'));
app.use(require('./rol'));
app.use(require('./sala'));
app.use(require('./acceso'));
app.use(require('./login'));
module.exports = app;