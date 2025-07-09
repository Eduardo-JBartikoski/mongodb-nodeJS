const express = require('express');
const router = express.Router();
const controller = require('../controladores/cadastroController');

//cadastro autenticação 

router.post('/cadastrar', controller.cadastrar);
router.post('/login', controller.login);

//admin apenas (proteger rota)
router.get('/usuarios', controller.listar);

module.exports = router;