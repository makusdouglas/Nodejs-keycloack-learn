const kcConnect = require('keycloak-connect');

const kcConfig = require('../configs/keycloakConfBackend');
module.exports = {
  login(req, res) {
    const { email, password } = req.body;
    kc = kcConnect({}, kcConfig);

    return res.json({
      email,
      password,
    });
  },
};
