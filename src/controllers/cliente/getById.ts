import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Cliente } from "../../entity/cliente";

async function getClienteById(req: Request, res: Response) {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const { id } = req.params;
  console.log("ID del cliente:", id);

  // res.status(200).json({ message: "Cliente encontrado" });

  try {
    const cliente = await clienteRepository.findOne({
      where: { email: id },
      // Opcional: cargar relaciones
      // relations: ["carritos"]
    });

    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ error: "Error al obtener cliente" });
  }
}

export default getClienteById;