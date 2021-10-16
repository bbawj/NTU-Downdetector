const Provider = require("../models/provider.model.js");

// Create and Save a new Provider
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Provider
  const provider = new Provider({
    name: req.body.name,
    downTimes: req.body.downTimes
  });

  // Save Provider in the database
  Provider.create(provider, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider."
      });
    else res.send(data);
  });
};

// Retrieve all Providers from the database.
exports.findAll = (req, res) => {
  Provider.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    else res.send(data);
  });
};

// Find a single Provider with a providerId
exports.findOne = (req, res) => {
  Provider.findById(req.params.providerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Provider with id ${req.params.providerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Provider with id " + req.params.providerId
        });
      }
    } else res.send(data);
  });
};

// Update a Provider identified by the providerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Provider.updateById(
    req.params.providerId,
    new Provider(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Provider with id ${req.params.providerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Provider with id " + req.params.providerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Provider with the specified providerId in the request
exports.delete = (req, res) => {
  Provider.remove(req.params.providerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Provider with id ${req.params.providerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Provider with id " + req.params.providerId
        });
      }
    } else res.send({ message: `Provider was deleted successfully!` });
  });
};

// Delete all Providers from the database.
exports.deleteAll = (req, res) => {
  Provider.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all providers."
      });
    else res.send({ message: `All providers were deleted successfully!` });
  });
};
