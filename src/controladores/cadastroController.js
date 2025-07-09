const Cadastro = require('../modelos/cadastroModelo');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cadastroController = {
    async cadastrar(req, res) {
        try {
            const {usuario, email, senha } = req.body;

            const existe = await Cadastro.Model.buscarPorEmail(email);
            if (existe) return res.status(400).json({erro: 'Email já cadastrado'});

            const senhaHash = await bcrypt.hash(senha, saltRounds);

            const resultado = await Cadastro.Model.criarUsuarop(usuario,email,senhaHash);

            res.status(201).json({
                id: resultado.insertedID,
                usuario,
                email
            });
        } catch (erro)  {
            res.status(500).json({erro: 'Falha no cadastro '});
        }
    },
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await CadastroModel.buscarPorEmail(email);

            if(!usuario) return res.status(401).json({erro: 'Credenciais inválidas '});

            res.json({
                mensagem: 'Login bem-sucedido',
                usuario: usuario.usuario,
                email: usuario.email
            });
        } catch (erro) {
            res.status(500).json({ erro: 'Falha no login '});
        }
    }
}
module.exports = cadastroController;