const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { dbConnection } = require('../database/config');

const getSalesHeaderListWithPage = async(req, res = response) => {

    const {
        search = '', limiter = 10, start = 0
    } = req.body;

    console.log(req.body)

    try{

      var OSQL = await dbConnection.query(`call getSalesHeaderListWithPage('${ search }',${ start },${ limiter })`)

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

const insertSale = async(req, res) => {
   
  console.log(req.body)

  const {
    idUser,
    idClient,
    total,
    productsSelect
  } = req.body;

  try{

      var OSQL = await dbConnection.query(`call insertSale(
        ${ idUser }  
        , ${ idClient }
        ,1
        )`)

          if( OSQL[0].out_id > 0 ){

            var p_idSale = OSQL[0].out_id;

            for( var i = 0; i < productsSelect.length; i++ ){

                var idProduct = productsSelect[i].idProduct;
                var cantidadSale = productsSelect[i].cantidadSale;
                var precio = productsSelect[i].precio;
                var observaciones = productsSelect[i].observaciones;
                
                var OInsertSaleDetail = await dbConnection.query(`call insertSaleDetail(
                    ${p_idSale}
                    , ${idProduct}
                    , '${cantidadSale}'
                    , '${precio}'
                    , '${observaciones}'
                    )`)

                    console.log( OInsertSaleDetail );

                var OSQLProduct = await dbConnection.query(`call getProductByID(${ idProduct })`)

                if(OSQLProduct.length > 0){
                    
                    var OProduct = OSQLProduct[0];

                    if( OProduct.precio != precio){
                        var OUpdateProductPrice = await dbConnection.query(`call updateProductPrice(${ idProduct }, '${ precio }')`)
                        console.log( OUpdateProductPrice );
                    }

                    var OInsertInventary = await dbConnection.query(`call insertInventary(
                      ${ idUser }
                      , '${ 2 }'
                      , ${ idProduct }
                      , '-${ cantidadSale }'
                      , '${ observaciones }'
                      )`)


                }

                const iRows = ( OSQL.length > 0 ? OSQL[0].iRows: 0 );
            }
            
            res.json({
                status:0,
                message:"Venta guardada con éxito.",
            });

          }
          else{
            res.json({
                status:1,
                message:"Ocurrió un detalle al guardar la venta",
                insertID: OSQL[0].out_id
            });
          }

  }catch(error){
      
      res.status(500).json({
          status:2,
          message:"Sucedió un error inesperado",
          data:error
      });
  }
}

const getSaleById = async(req, res = response) => {

  const {
      idSale
  } = req.body;

  console.log(req.body)
  var OSQL = await dbConnection.query(`call getSaleById(${ idSale })`)


  console.log( OSQL );

  

  if( OSQL.length > 0 ){

    var OSale = OSQL[0];

    var OGetSaleDetailById = await dbConnection.query(`call getSaleDetailById(${ idSale })`)

    var OData = {
      'idSale': OSale.idSale,
      'createDate': OSale.createDate,
      'idClient': OSale.idClient,
      'clientName': OSale.clientName,
      'totalSale': OSale.totalSale,
      'saleDetail': OGetSaleDetailById
    };


    console.log( OData )

    res.json({
      status:0,
      message:"Ejecutado correctamente.",
      data: OData
    });
  }

};

module.exports = {
    insertSale
    , getSalesHeaderListWithPage
    , getSaleById
  }