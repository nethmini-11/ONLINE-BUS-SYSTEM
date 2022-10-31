const Validator = require("fastest-validator");
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function save(req, res) {
    const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        username: req.body.userName,
        password: req.body.password,
        role: req.body.roleType,
        expireDates: req.body.expireDays,
        busRoute: req.body.busRoot,
        busNo: req.body.busNo,
    };

    const schema = {
        fullName: {type: "string", optional: false, max: "100"},
        mobileNo: {type: "string", max: "10"},
        username: {type: "string", optional: false},
        password: {type: "string", optional: false},
    };

    const v = new Validator();
    const validateResponse = v.validate(user, schema);

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse,
        });
    }

    models.User.create(user)
        .then((result) => {
            res.status(201).json({
                message: "User created succesfully",
                user: result,
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

    models.User.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "User not found",
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
    models.User.findAll()
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

function passengers(req, res) {
    models.User.findAll({
        where: {
            role: {
                [Op.or]: ['local', 'foreign']
            }
        }
    })
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
    const updatedUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        expireDates: req.body.expireDays,
        busRoute: req.body.busRoot,
        busNo: req.body.busNo,
    };

    const schema = {
        fullName: {type: "string", optional: false, max: "100"},
        mobileNo: {type: "string", max: "10"},
        username: {type: "string", optional: false},
        password: {type: "string", optional: false},
    };

    const v = new Validator();
    const validateResponse = v.validate(updatedUser, schema);

    if (validateResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse,
        });
    }

    models.User.update(updatedUser, {where: {id: id}})
        .then((result) => {
            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser,
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

    models.User.destroy({where: {id: id}})
        .then((result) => {
            res.status(200).json({
                message: "User deleted succesfully",
            });
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
    passengers: passengers,
};
