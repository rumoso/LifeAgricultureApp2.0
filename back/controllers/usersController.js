const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { dbConnection } = require('../database/config');

const User = require('../models/user');

const getUsersList = async(req, res = response) => {

    const {
        search, limiter = 10, offsetter = 0
    } = req.body;

    console.log(req.body)
    var OSQL = await dbConnection.query(`call getUsers('${ search }')`)
    //var OSQL = await dbConnection.query(`call getUsers(${ offsetter },${ limiter })`)

    const iRows = ( OSQL.length > 0 ? OSQL[0].iRows: 0 );
        
    res.json({
        status:0,
        message:"Ejecutado correctamente.",
        data:{
          count: iRows,
          rows: OSQL
        }
      });

};

const usersPUT = (req, res) => {

    const { id } = req.params;

    res.json({
        bOK: true,
        msg: 'post API -- controlador',
        id
    });
};

const usersPOST = async(req, res) => {

    const { name, email, pwd, img, rol, status, google } = req.body;

    const user = new User({name, email, pwd, img, rol, status, google});
    //Encriptar   
    const salt = bcryptjs.genSaltSync(10);

    user.pwd = bcryptjs.hashSync( pwd, salt );

    await user.save();

    res.json({
        bOK: true,
        msg: 'post API -- controlador' ,
        user
    });
};

const usersDELETE = (req, res) => {
    res.json({
        bOK: true,
        msg: 'delete API -- controlador'
    });
};

  module.exports = {
    getUsersList,
    usersPUT,
    usersPOST,
    usersDELETE
  }