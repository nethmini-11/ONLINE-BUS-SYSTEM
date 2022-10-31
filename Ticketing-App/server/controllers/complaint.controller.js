const Validator = require('fastest-validator');
const models = require('../models');

function save(req,res){
    const complaint = {
        userId: 1,
        reportUser: req.body.reportUser,
        remarks: req.body.remarks
       
    }

    const schema = {
        
        reportUser: {type: "string", optional: false, max: "100"},
        remarks: {type: "string", optional: false, max: "500"},
        
    }

    const v = new Validator();
    const validateResponse = v.validate(complaint, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }
    
    models.Complaint.create(complaint).then(result=>{
        res.status(201).json({
            message: "Complain created succesfully",
            compaint: result
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

    Complaint.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Complain not found"
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
    models.Complaint.findAll().then(result=>{
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
    const updatedComplain = {
        reportUser: req.body.reportUser,
        remarks: req.body.remarks,
       
    }

    const userId = 1;

    const schema = {
        reportUser: {type: "string", optional: false, max: "100"},
        remarks: {type: "string", optional: false, max: "500"},
        
    }

    const v = new Validator();
    const validateResponse = v.validate(updatedComplain, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }

    models.Complaint.update(updatedComplaint, {where: {id:id, userId:userId}}).then(result=>{
        res.status(200).json({
            message: "Complain updated successfully",
        complaint: updatedComplaint
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
    

    models.Complaint.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: "Complaint deleted succesfully"
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