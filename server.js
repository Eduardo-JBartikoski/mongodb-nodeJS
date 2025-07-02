import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Cliente from "./vendasclientes.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://eduardobi207:9BnQHAgmnCoQ2GuM@server1.cztendk.mongodb.net/bancoDB?retryWrites=true&w=majority&appName=server1");
        console.log("Conectado ao MongoDB");

    } catch (error) {
        console.log("Erro ao conectar com o mongoDB", error);
    }
};

connectDB();

//criando

app.post("/clientes", async (req,res) => {
    try {
        const novoUsuario = await Cliente.create(req.body);
        res.json(vendasclientes);
    } catch (error) {
        res.json({ error: error.message });
    }
});


// updade
app.put("/clientes/:id", async (req, res) => {
    try {
        const clientesAtualizado = await Cliente.findByidAndUpdate(
            req.params.id,
            req.body
        );
    } catch (error) {
        res.json({error: error.message });
    }
});

//DELETE
app.delete("/clientes/:id", async (req, res) => {
    try {
        const clienteDeletado = await Cliente.findByIdAndDelete(
            req.params.id
        );
    } catch (error) {
        res.json({error: error.message });
    }
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
