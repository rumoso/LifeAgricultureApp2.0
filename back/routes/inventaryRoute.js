const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail } = require('../helpers/db-validators/user-validator');

const { 
  insertInventary
  , getInventaryByIdProductListWithPage
 } = require('../controllers/inventaryController');


const router = Router();

router.post('/insertInventary', [
  check('idUser','Usuario obligatorio').not().isEmpty(),
  check('idUser','Usuario debe ser numérico').isNumeric(),

  check('idMovimiento','Movimiento obligatorio').not().isEmpty(),
  check('idMovimiento','Movimiento debe ser numérico').isNumeric(),

  check('idProduct','Producto obligatorio').not().isEmpty(),
  check('idProduct','Producto debe ser numérico').isNumeric(),

  check('cantidad','Cantidad obligatoria').not().isEmpty(),
  check('cantidad','Cantidad debe ser numérico').isNumeric(),

  validarCampos
], insertInventary);

router.post('/getInventaryByIdProductListWithPage', getInventaryByIdProductListWithPage);

//router.post('/', [
 //   check('email','El correo no es valido').isEmail(),
  //  check('email').custom( existeEmail ),
  //  check('rol').custom( esRolValido ),
  //  validarCampos
//], usersPOST);

//router.delete('/', usersDELETE);

module.exports = router;