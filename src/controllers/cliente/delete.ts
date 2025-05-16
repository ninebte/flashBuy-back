import AppDataSource from "../../../config/db";
import { Cliente } from "../../entity/cliente";
import { Request, Response } from "express";
async function deleteCliente(req: Request, res: Response) 
{
  const clienteRepository = AppDataSource.getRepository(Cliente);
   const { id } = req.params;
   console.log("ID del cliente:", id);

  //res.status(200).json({ message: "Cliente encontrado" });

  try {

    // Opción 2: Cargar la entidad primero (permite lógica adicional)
    const cliente = await clienteRepository.findOne({ 
      where: { email: id } 
    });
    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    await clienteRepository.remove(cliente);
    res.status(200).json({ success: true, message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
}

export default deleteCliente;