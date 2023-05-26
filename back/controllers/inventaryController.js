const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { dbConnection } = require('../database/config');

const insertInventary = async(req, res) => {
   
  console.log(req.body)
  const {
    idUser,
    idMovimiento,
    idProduct,
    cantidad,
    description = ''
  } = req.body;

  try{

      var OSQL = await dbConnection.query(`call insertInventary(
          ${idUser}
          , '${idMovimiento}'
          , ${idProduct}
          , '${cantidad}'
          , '${description}'
          )`)

      res.json({
          status:0,
          message:"Inventario guardado con éxito.",
          insertID: OSQL[0].out_id
      });
      
  }catch(error){
      
      res.status(500).json({
          status:2,
          message:"Sucedió un error inesperado",
          data:error
      });
  }
}

const getInventaryByIdProductListWithPage = async(req, res = response) => {

    const {
        idProduct, limiter = 10, offsetter = 0
    } = req.body;

    console.log(req.body)
    var OSQL = await dbConnection.query(`call getInventaryByIdProductListWithPage(${ idProduct },${ offsetter },${ limiter })`)

    if(OSQL.length == 0){
        res.json({
            status:0,
            message:"Ejecutado correctamente.",
            data:{
              count: 0,
              rows: null
            }
          });
    }else{
      const iRows = ( OSQL.length > 0 ? OSQL[0].iRows: 0 );
        
      res.json({
          status:0,
          message:"Ejecutado correctamente.",
          data:{
            count: iRows,
            rows: OSQL
          }
        });
    }
};

module.exports = {
    insertInventary
    , getInventaryByIdProductListWithPage
  }