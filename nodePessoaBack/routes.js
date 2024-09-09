const express = require('express');
const pessoaController = require('./controller/PessoaController');

const router = express.Router();

router.post('/pessoas', pessoaController.createPessoa);
router.get('/pessoas', pessoaController.getAllPessoas);
router.get('/pessoas/:Id', pessoaController.getPessoaById);
router.put('/pessoas/:Id', pessoaController.updatePessoa);
router.delete('/pessoas/:Id', pessoaController.deletePessoa);

module.exports = router;