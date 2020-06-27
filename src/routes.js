const { Router } = require('express');
const routes = Router();
const Keycloak = require('keycloak-connect');
const keycloakConf = require('./configs/keycloakConfBackend');

//Controlllers
const SessionController = require('./Controllers/SessionController');

const kc = new Keycloak(
  {
    // Session store etc. from keycloak samples is not necessary...
  },
  keycloakConf
);
routes.post('/login', SessionController.login);
routes.get('/testando', (req, res, next) => {
  return res.json({
    message: 'Test OK',
  });
});
routes.get('/ping-unprotected', (req, res, next) => {
  res.end('pong-unprotected');
});

routes.get('/ping-protected', kc.protect(), (req, res, next) => {
  res.end('pong-protected');
});

module.exports = routes;
