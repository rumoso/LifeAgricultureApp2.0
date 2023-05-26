const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { dbConnection } = require('../database/config');

const getUnidadesMedida = async(req, res = response) => {

    const {
        search, limiter = 10, offsetter = 0
    } = req.body;

    console.log(req.body)
    //var OSQL = await dbConnection.query(`call getUnidadesMedida('${ search }',${ offsetter },${ limiter })`)
    var OSQL = await dbConnection.query(`call getUnidadesMedida()`)

    const iRows = ( OSQL.length > 0 ? OSQL[0].iRows: 0 );
        
    res.json({
        status:0,
        message:"Ejecutado correctamente.",
        search,
        data:{
          count: iRows,
          rows: OSQL
        }
      });

};

module.exports = {
  getUnidadesMedida
  }