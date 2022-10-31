const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const journey = {
    busUserId: req.body.busUserId,
    userId: req.body.userId,
    busRoute: req.body.busRoute,
    terminal: req.body.terminal,
    destination: req.body.destination,
    amount: req.body.amount,
  };

  //   const schema = {
  //     busUserId: { type: "number", optional: false },
  //     userId: { type: "number", optional: false },
  //   };

  //   const v = new Validator();
  //   const validateResponse = v.validate(journey, schema);

  //   if (validateResponse !== true) {
  //     return res.status(400).json({
  //       message: "Validation failed",
  //       error: validateResponse,
  //     });
  //   }

  models.Journey.create(journey)
    .then((result) => {
      res.status(201).json({
        message: "Journey created succesfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function show(req, res) {
  const id = req.params.id;

  models.Journey.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Journey not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function index(req, res) {
  models.Journey.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedJourney = {
    busUserId: req.body.busUserId,
    userId: req.body.userId,
    busRoute: req.body.busRoute,
    terminal: req.body.terminal,
    destination: req.body.destination,
    amount: req.body.amount,
  };

  //   const schema = {
  //     busUserId: { type: "number", optional: false },
  //     userId: { type: "number", optional: false },
  //   };

  //   const v = new Validator();
  //   const validateResponse = v.validate(updatedJourney, schema);

  //   if (validateResponse !== true) {
  //     return res.status(400).json({
  //       message: "Validation failed",
  //       error: validateResponse,
  //     });
  //   }

  models.Journey.update(updatedJourney, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Journey updated successfully",
        post: updatedJourney,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Journey.destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Journey deleted succesfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function find(req, res) {
  models.Journey.findAll({ where: { busUserId: req.params.id } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
  find: find,
};
