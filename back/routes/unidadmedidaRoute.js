const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail } = require('../helpers/db-validators/user-validator');

const { getUnidadesMedida } = require('../controllers/unidadMedidaController');


const router = Router();

router.post('/getUnidadesMedida', getUnidadesMedida);


//router.post('/', [
 //   check('email','El correo no es valido').isEmail(),
  //  check('email').custom( existeEmail ),
  //  check('rol').custom( esRolValido ),
  //  validarCampos
//], usersPOST);

//router.delete('/', usersDELETE);

module.exports = router;