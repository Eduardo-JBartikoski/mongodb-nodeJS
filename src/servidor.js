import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Configurações iniciais

console.log("Valor de MONGO_URI:", process.env.MONGO_URI);
console.log("Variáveis de ambiente carregadas:", process.env);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Modelo
const usuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']    
    },
    senha: { type: String, required: true, select: false }
}, { timestamps: true });

// Hash da senha
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

const Cadastro = mongoose.model('cadastro', usuarioSchema);

// Conexão com o Banco
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Conectado ao MongoDB!");
    } catch (error) {
        console.error("❌ Erro de conexão:", error.message);
        process.exit(1);
    }
};

// Rotas
app.post("/cadastros", async (req, res) => {
    try {
        const { usuario, email, senha } = req.body;
        const novoCadastro = await Cadastro.create({ usuario, email, senha });
        res.status(201).json({
            id: novoCadastro._id,
            usuario: novoCadastro.usuario,
            email: novoCadastro.email
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// (Mantenha as outras rotas GET, PUT, DELETE que você já tem)

// Iniciar
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    });
});