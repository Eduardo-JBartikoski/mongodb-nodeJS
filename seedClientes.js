import mongoose from "mongoose";
import dotenv from "dotenv";
import Cliente from "./vendasclientes.js";
import { Console } from "console";

dotenv.config();

const clientes = [
  { nome: "João Silva", email: "joao@email.com" },
  { nome: "Maria Souza", email: "maria@email.com" },
  { nome: "Carlos Pereira", email: "carlos@email.com" },
  { nome: "Ana Lima", email: "ana@email.com" },
  { nome: "Bruno Costa", email: "bruno@email.com" },
  { nome: "Fernanda Rocha", email: "fernanda@email.com" },
  { nome: "Diego Mendes", email: "diego@email.com" },
  { nome: "Luciana Teixeira", email: "luciana@email.com" },
  { nome: "Ricardo Barbosa", email: "ricardo@email.com" },
  { nome: "Juliana Almeida", email: "juliana@email.com" }
];


const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");

        const resultado = await Cliente.insertMany(clientes);
        console.log("Clientes inseridos com sucesso:");
        console.log(resultado);

        process.exit(); //encerra script
    } catch (error) {
        console.error("Erro ao inserir clientes", error.message);
        process.exit(1);
    }
};

seedDB();