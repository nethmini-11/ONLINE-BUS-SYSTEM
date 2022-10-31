const Validator = require('fastest-validator');
const models = require('../models');

function save(req,res){
    const timetable = {
        busRoute: req.body.busRoute,
        busNo: req.body.busNo,
        terminal: req.body.terminal,
        destination: req.body.destination,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime
    }

    const schema = {
        busNo: {type: "string", optional: false, max: "100"}
    }

    const v = new Validator();
    const validateResponse = v.validate(timetable, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }
    
    models.TimeTable.create(timetable).then(result=>{
        res.status(201).json({
            message: "TimeTable created succesfully",
            timetable: result
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

    models.TimeTable.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "TimeTable not found"
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
    models.TimeTable.findAll().then(result=>{
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
    const updatedTimetable = {
        busRoute: req.body.busRoute,
        busNo: req.body.busNo,
        terminal: req.body.terminal,
        destination: req.body.destination,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime
    };
    
    const schema = {
        busNo: {type: "string", optional: false, max: "100"}
    };

    const v = new Validator();
    const validateResponse = v.validate(updatedTimetable, schema);

    if(validateResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validateResponse
        });
    }

    models.TimeTable.update(updatedTimetable, {where: {id:id}}).then(result=>{
        res.status(200).json({
            message: "Timetable updated successfully",
            timetable: updatedTimetable
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
    
    models.TimeTable.destroy({where:{id:id}}).then(result=>{
        res.status(200).json({
            message: "Timetable deleted succesfully"
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
    destroy: destroy,
}