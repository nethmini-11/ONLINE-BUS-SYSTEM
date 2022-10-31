const Validator = require('fastest-validator');
const models = require('../models');

function save(req,res){
    const inspectedbus = {
        userId: req.body.userId,
        busRoute: req.body.busRoute,
        busNo: req.body.busNo,
        remarks: req.body.remarks 
    }

    const schema = {
        busRoute: {type: "string", optional: false, max: "100"},
        busNo: {type: "string", max: "10"}
    }

    const v = new Validator();
    const validateResponse = v.validate(inspectedbus, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }
    
    models.InspectedBus.create(inspectedbus).then(result=>{
        res.status(201).json({
            message: "Inspectedbus created succesfully",
            inspectedbus: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });

    });
}

function show(req,res){
    const id = req.params.id;

    models.InspectedBus.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Inspectedbus not found"
            })
        }
        
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}

function index(req,res){
    models.InspectedBus.findAll().then(result=>{
        res.status(200).json(result);
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function update(req,res){
    const id = req.params.id;
    const updatedInspectedbus = {
        userId: req.body.userId,
        busRoute: req.body.busRoute,
        busNo: req.body.busNo,
        remarks: req.body.remarks
    }

    const schema = {
        busRoute: {type: "string", optional: false, max: "100"},
        busNo: {type: "string", max: "10"}
    }

    const v = new Validator();
    const validateResponse = v.validate(updatedInspectedbus, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }

    models.InspectedBus.update(updatedInspectedbus, {where: {id:id}}).then(result=>{
        res.status(200).json({
            message: "Inspectedbus updated successfully",
            inspectedbus: updatedInspectedbus
        });
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong",
            error: error
        });
    });
}

function destroy(req, res){
    const id = req.params.id;

    models.InspectedBus.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: "Inspectedbus deleted succesfully"
        });
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

module.exports = {
    save : save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}