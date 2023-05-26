const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail } = require('../helpers/db-validators/user-validator');

const { getUsersList,
    usersPUT,
    usersPOST,
    usersDELETE } = require('../controllers/usersController');


const router = Router();

router.post('/', getUsersList);

router.put('/:id', usersPUT);

router.post('/', [
    check('email','El correo no es valido').isEmail(),
    check('email').custom( existeEmail ),
    check('rol').custom( esRolValido ),
    validarCampos
], usersPOST);

router.delete('/', usersDELETE);

module.exports = router;