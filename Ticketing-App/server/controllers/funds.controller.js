const models = require("../models");

function recharge(req, res) {
    const userId = req.params.id;

    models.User.findByPk(userId)
        .then(result => {
            if (!result) {
                res.status(500).json({
                    message: "User not Found"
                });
            }
            // console.log('Amount Exist ' + result.accountBalance);
            let integerAmount = parseInt(req.body.amount, 10);
            let amount = integerAmount + result.accountBalance;
            result.update({
                accountBalance: amount
            }).then(result => {
                res.status(200).json({
                    message: "Recharge updated successfully",
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error,
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });

}

function withdraw(req, res) {
    const userId = req.params.id;
    models.User.findByPk(userId)
        .then(result => {
            if (!result) {
                res.status(500).json({
                    message: "User not Found"
                });
            }
            let integerAmount = parseInt(req.body.amount, 10);
            let amount = result.accountBalance - integerAmount;
            result.update({
                accountBalance: amount
            }).then(result => {
                res.status(200).json({
                    message: "Withdraw updated successfully",
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error,
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function check(req, res) {
    const userId = req.params.id;

    models.User.findByPk(userId)
        .then(result => {
            if (!result) {
                res.status(500).json({
                    message: "User not Found"
                });
            }
            let integerAmount = parseInt(req.body.amount, 10);
            let interAccBalance = parseInt(result.accountBalance, 10);
            if (interAccBalance >= integerAmount) {
                res.status(200).json({
                    message: "true",
                });
            } else {
                res.status(200).json({
                    error: "Insufficient funds",
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

function update(req, res) {
    models.User.findByPk(req.params.id)
        .then(result1 => {
            if (!result1) {
                res.status(500).json({
                    message: "User not Found"
                });
            }
            let integerAmount = parseInt(req.body.amount, 10);
            let accBalance = result1.accountBalance;
            let amount = accBalance - integerAmount;
            result1.update({
                accountBalance: amount
            }).then(result => {
                models.User.findByPk(req.body.busUserId).then(result3 => {
                    if (!result3) {
                        res.status(500).json({
                            message: "Bus user not Found"
                        });
                    }
                    let accBalance = result3.accountBalance;
                    let amountBus = accBalance + integerAmount;
                    result3.update({
                        accountBalance: amountBus
                    }).then(result4 => {
                        res.status(200).json({
                            message: "updated successfully",
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error,
                        });
                    })
                })

            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error,
                });
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
        });
}

module.exports = {
    recharge: recharge,
    withdraw: withdraw,
    check: check,
    update: update
};
