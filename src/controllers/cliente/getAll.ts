import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Cliente } from "../../entity/cliente";
async function getAllClientes(req: Request, res: Response) {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  try {
    const clientes = await clienteRepository.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
}

export default getAllClientes;

