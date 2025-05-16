import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Carrito } from "../../entity/carrito";

async function deleteCarrito(req: Request, res: Response) {
  const carritoRepository = AppDataSource.getRepository(Carrito);
  const { id } = req.params;
  console.log("ID del cliente:", id);


  try {
    // Opción 1: Eliminación directa (sin cargar la entidad)
    // const result = await clienteRepository.delete(id);
    // if (result.affected === 0) {
    //   throw new Error("Cliente no encontrado");
    // }
    // return { success: true };

    // Opción 2: Cargar la entidad primero (permite lógica adicional)
    const carrito = await carritoRepository.findOne(
      {where: {cliente_id: +id}}
    );
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    await carritoRepository.remove(carrito);
    res.status(200).json({ success: true, message: "Carrito eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar carrito:", error);
    res.status(500).json({ error: "Error al eliminar carrito" });
  }
}

export default deleteCarrito;