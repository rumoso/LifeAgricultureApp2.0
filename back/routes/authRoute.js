const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail } = require('../helpers/db-validators/user-validator');

const { 
    login
} = require('../controllers/authController');


const router = Router();

router.post('/login', [
    check('username','Usuario obligatorio').not().isEmpty(),
    check('pwd','Contraseña obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;