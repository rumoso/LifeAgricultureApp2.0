const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { dbConnection } = require('../database/config');

const getProductsListWithPage = async(req, res = response) => {

    const {
        search = '', limiter = 10, start = 0
    } = req.body;

    console.log(req.body)

    try{

        var OSQL = await dbConnection.query(`call getProductsListWithPage('${ search }',${ start },${ limiter })`)

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
    
    }catch(error){
      
        res.status(500).json({
            status:2,
            message:"Sucedió un error inesperado",
            data:error
        });
    }
};

const getProductByID = async(req, res = response) => {

  const {
      id
  } = req.body;

  console.log(req.body)
  var OSQL = await dbConnection.query(`call getProductByID(${ id })`)

  const iRows = ( OSQL.length > 0 ? OSQL[0].iRows: 0 );
      
  res.json({
      status:0,
      message:"Ejecutado correctamente.",
      data: OSQL
    });

};

const insertProduct = async(req, res) => {
   
  console.log(req.body)
  const {
    name,
    precio,
    idUnidadMedida
  } = req.body;

  try{

      var OSQL = await dbConnection.query(`call insertProduct(
          '${name}'
          , ${precio}
          , ${idUnidadMedida}
          ,1
          )`)

      res.json({
          status:0,
          message:"Producto guardado con éxito.",
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

const updateProduct = async(req, res) => {
   
  console.log(req.body)
  const {
    idProduct,
    name,
    precio,
    idUnidadMedida
  } = req.body;

  try{

      var OSQL = await dbConnection.query(`call updateProduct(
          ${idProduct}  
          , '${name}'
          , ${precio}
          , ${idUnidadMedida}
          ,1
          )`)

      res.json({
          status:0,
          message:"Producto actualizado con éxito.",
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

const deleteProduct = async(req, res) => {
   
  console.log(req.body)
  const {
    idProduct
  } = req.body;

  try{

      var OSQL = await dbConnection.query(`call deleteProduct(
          ${idProduct}
          )`)

      res.json({
          status:0,
          message:"Producto eliminado con éxito.",
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

const getProductsToSale = async(req, res = response) => {

    try{

        var OSQL = await dbConnection.query(`call getProductsListWithPage('', 0, 9999)`)

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

            var ODataList = [];
            for(var i = 0; i < iRows; i++){
        
                var OData = {
                    'idProduct': OSQL[i].idProduct,
                    'name': OSQL[i].name,
                    'precio': OSQL[i].precio,
                    'cantidad': OSQL[i].cantidad,
                    'UMDesc': OSQL[i].UMDesc
                };
        
                ODataList.push( OData )
        
            }
        
            console.log( ODataList )
                
            res.json({
                status:0,
                message:"Ejecutado correctamente.",
                data:{
                rows: ODataList
                }
            });
        }

    
    }catch(error){
      
        res.status(500).json({
            status:2,
            message:"Sucedió un error inesperado",
            data:error
        });
    }
};

module.exports = {
    getProductsListWithPage
    ,getProductByID
    ,insertProduct
    ,updateProduct
    ,deleteProduct
    ,getProductsToSale
  }