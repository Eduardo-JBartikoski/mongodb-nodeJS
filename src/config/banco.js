import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Cliente from "../controladores/cadastroController.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//usuariarios

const usuarioSchema = new mongoose.Schema({
    usuario: {type: String, require: true, trim: true },
    email: { type: String, require: true, unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']    
    },
    senha: { type: String, required: true, select: false } // Corrigido "semha" para "senha"
}, { timestamps: true });


//Middleware hash senha
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

const Cadastro = mongoose.model('cadastro',usuarioSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://eduardobi207:9BnQHAgmnCoQ2GuM@server1.cztendk.mongodb.net/bancoDB?retryWrites=true&w=majority&appName=server1", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao seu servidor MongoDB");

    } catch (error) {
        console.log("Erro ao conectar com o mongoDB", error);
        process.exit(1);
    }
};



//rotas
app.post("/cadastros", async (req,res) => {
    try {
        const { usuario, email, senha } = req.body;
        const senhaHash = await bcrypt.hash(senha,10);

        const novoCadastro = await Cadastro.create({
            usuario,
            email,
            senha: senhaHash
        });

        res.status(201).json({
            id: novoCadastro._id,
            usuario: novoCadastro.usuario,
            email: novoCadastro.email
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//read get todos //////////////////////////////
app.get("/cadastros", async (req, res) => {
    try {
        const cadastros = await Cadastro.find({}, {senha: 0});
        res.json(cadastros);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
});

//Update ///////////////////////////////
app.put("/cadastros/:id", async (req, res) => {
    try {
        const {usuario, email } = req.body;
        const atualizado = await Cadastro.findByIdAndUpdate(
            req.params.id,
            {usuario, email },
            { new: true}
        );
        res.json(atualizado);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//DELETE //////////////////////////////////
app.delete("/cadastros/:id", async (req, res) => {
    try{
        await Cadastro.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

connectDB().then(() => {
    
    app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));

});

