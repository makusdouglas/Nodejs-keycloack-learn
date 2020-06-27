'use strict';

const express = require('express');
const Keycloak = require('keycloak-connect');
const join = require('path').join;

//Files imports
const routes = require('./routes');

// You can get this from the "Installation" tab of your Realm (app) in Keycloak
const keycloakConf = require('./configs/keycloakConfBackend');

const kc = new Keycloak(
  {
    // Session store etc. from keycloak samples is not necessary...
  },
  keycloakConf
);

// Our express web application
const app = express();
app.use(express.json());

// Requests that aren't matched by express.static will pass through this
// This function will perfrom some keycloak setup on the request object
app.use(
  kc.middleware({
    logout: '/logout',
    admin: '/',
  })
);

app.use((req, res, next) => {
  console.log(
    `[${req.originalUrl}] authorisation header ${req.headers.authorization}`
  );

  next();
});
app.use(routes);

// This endpoint can be accessed without a bearer token

// Serves static assets from www directory if matches are found
app.use('/home', express.static(join(__dirname, '..', 'www')));

app.listen(3030, (err) => {
  if (err) {
    console.log('failed to start server');
    throw err;
  }

  console.log('test application started on http://localhost:3030');
});
