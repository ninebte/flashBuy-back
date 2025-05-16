import AppDataSource from "../../../config/db";
import { CarritoProducto } from "../../entity/carritoproducto";
import { Request, Response } from "express";

async function deleteCarritoProducto(req: Request, res: Response) {
    const carritoProductoRepository = AppDataSource.getRepository(CarritoProducto);
    const { id } = req.params;
    console.log("ID del cliente:", id);

    // res.status(200).json({ message: "Cliente encontrado" });
    
    try {
      
      // Opción 2: Cargar la entidad primero (permite lógica adicional)
      const carritoproducto = await carritoProductoRepository.findOne(
        {where: {carrito_id: +id}}
      );
      if (!carritoproducto) {
        throw new Error("Carrito producto no encontrado");
      }
      
      await carritoProductoRepository.remove(carritoproducto);
      res.status(200).json({ success: true, message: "Carrito producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar carrito producto:", error);
      res.status(500).json({ error: "Error al eliminar carrito producto" });
    }
  }

  export default deleteCarritoProducto;