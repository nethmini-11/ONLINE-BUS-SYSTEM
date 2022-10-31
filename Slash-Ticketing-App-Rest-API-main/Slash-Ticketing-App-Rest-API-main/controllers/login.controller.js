const Validator = require("fastest-validator");
const models = require("../models");

function index(req, res) {
    models.User.findOne({where:{username:req.body.userName,password:req.body.password}})
      .then((result) => {
          if(result){
            res.status(200).json(result);
          }
          else{
            res.status(404).json({"message":"no user found"});
          }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong",
          error: error,
        });
      });
  }

  module.exports = {
    index: index
  };