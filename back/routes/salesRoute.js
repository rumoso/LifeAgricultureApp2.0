const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail } = require('../helpers/db-validators/user-validator');

const {
  insertSale
  , getSalesHeaderListWithPage
  , getSaleById

 } = require('../controllers/salesController');


const router = Router();

router.post('/insertSale', [
  check('idClient','Cliente obligatorio').not().isEmpty(),

  validarCampos
], insertSale);

router.post('/getSalesHeaderListWithPage', getSalesHeaderListWithPage);

router.post('/getSaleById', [
  check('idSale','Id obligatorio').not().isEmpty(),

  validarCampos
], getSaleById);

module.exports = router;