const { getBanco} = require ('../config/banco.js');

class Cadastro {


    static getColecao(){
        return getBanco().collection('cadastro');
    }

    static async criar(dados) {
        return await this.getColecao().insertOne(dados);
    }

    static async buscarTodos() {
        return await this.getColecao().find().toArray();
    }

    static async buscarPorId(id) {
        const { ObjectId } = require('mongodb');
        return await this.getColecao().findOne({ _id: new ObjectId(id)});
    }
}

module.exports = Cadastro;

