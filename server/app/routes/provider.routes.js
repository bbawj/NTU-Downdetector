module.exports = app => {
  const providers = require("../controllers/provider.controller.js");

  const subDomain = '/api';

  // Create a new Provider
  app.post(subDomain+"/providers", providers.create);

  // Retrieve all Providers
  app.get(subDomain+"/providers", providers.findAll);

  // Retrieve a single Provider with providerId
  app.get(subDomain+"/providers/:providerId", providers.findOne);

  // Update a Provider with providerId
  app.put(subDomain+"/providers/:providerId", providers.update);

  // Delete a Provider with providerId
  app.delete(subDomain+"/providers/:providerId", providers.delete);

  // Create a new Provider
  app.delete(subDomain+"/providers", providers.deleteAll);
};
