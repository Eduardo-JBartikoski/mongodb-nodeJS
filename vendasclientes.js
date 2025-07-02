// vendasclientes.js
import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nome: String,
  email: String
});

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;