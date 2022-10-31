const Validator = require('fastest-validator');
const models = require('../models');

function save(req,res){
    const inspectreport = {
        userId: req.body.userId,
        inspectedId: req.body.inspectedId,
        reportUser: req.body.reportUser,
        userType: req.body.userType,
        remarks: req.body.remarks
    }

    // const schema = {
    //     userId: {optional: false},
    //     inspectedId: {optional: false}
    // }

    // const v = new Validator();
    // const validateResponse = v.validate(inspectreport, schema);

    // if(validateResponse !== true){
    //     return res.status(400).json({
    //         message: "Validation failed",
    //         error: validateResponse
    //     });
    // }
    
    models.InspectReport.create(inspectreport).then(result=>{
        res.status(201).json({
            message: "InspectReport created succesfully",
            inspectreport: result
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

    models.InspectReport.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "InspectReport not found"
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
    models.InspectReport.findAll().then(result=>{
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
    const updatedInspectreport = {
        userId: req.body.userId,
        inspectedId: req.body.inspectedId,
        reportUser: req.body.reportUser,
        userType: req.body.userType,
        remarks: req.body.remarks
    }

    const schema = {
        userId: {type: "number", optional: false},
        inspectedId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validateResponse = v.validate(updatedInspectreport, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }

    models.InspectReport.update(updatedInspectreport, {where: {id:id}}).then(result=>{
        res.status(200).json({
            message: "InspectReport updated successfully",
            inspectreport: updatedInspectreport
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

    models.InspectReport.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: "InspectReport deleted succesfully"
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