const roles = require('../models/roles')
const panel = require('../models/panel')

//get roles
const getRoles =  async(req,res)=>{
    roles.find().exec((err,roles)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingRoles:roles
        });
    });
}

//Create panel
const createPanel = async(req,res)=>{
    let newPanel = new panel(req.body);

    newPanel.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Panel added to the system!"
        });
    });

}

//get panels
const getPanels =  async(req,res)=>{
    panel.find().exec((err,panels)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPanels:panels
        });
    });
}






module.exports = {
    getRoles,
    createPanel,
    getPanels
}