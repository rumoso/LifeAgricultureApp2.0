const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail } = require('../helpers/db-validators/user-validator');

const { 
  getProductsListWithPage
  , getProductByID
  , insertProduct
  , updateProduct
  , deleteProduct
  , getProductsToSale
 } = require('../controllers/productsController');


const router = Router();

router.post('/getProductsListWithPage', getProductsListWithPage);

router.post('/getProductByID', [
  check('id','Id obligatorio').not().isEmpty(),
  check('id','Id debe ser numérico').isNumeric(),
  validarCampos
], getProductByID);

router.post('/insertProduct', [
  check('name','Nombre obligatorio').not().isEmpty(),

  check('idUnidadMedida','Unidad de medida obligatoria').not().isEmpty(),
  check('idUnidadMedida','IUnidad de medidad debe ser numérico').isNumeric(),
  
  validarCampos
], insertProduct);

router.post('/updateProduct', [
  check('idProduct','Id obligatorio').not().isEmpty(),
  check('idProduct','Id debe ser numérico').isNumeric(),

  check('name','Nombre obligatorio').not().isEmpty(),

  check('idUnidadMedida','Unidad de medida obligatoria').not().isEmpty(),
  check('idUnidadMedida','Unidad de medida debe ser numérico').isNumeric(),
  validarCampos
], updateProduct);

router.post('/deleteProduct', [
  check('idProduct','Id obligatorio').not().isEmpty(),
  check('idProduct','Id debe ser numérico').isNumeric(),
  validarCampos
], deleteProduct);

router.post('/getProductsToSale', getProductsToSale);

module.exports = router;