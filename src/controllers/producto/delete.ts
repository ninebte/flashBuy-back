import AppDataSource from "../../../config/db";
import { Producto } from "../../entity/producto";
import { Request, Response } from "express";
async function deleteProducto(req: Request, res: Response) {
  const productoRepository = AppDataSource.getRepository(Producto);
    const { id } = req.params;
    console.log("ID del cliente:", id);

    // res.status(200).json({ message: "Cliente encontrado" });
    
    try {
      // Opción 1: Eliminación directa (sin cargar la entidad)
      // const result = await clienteRepository.delete(id);
      // if (result.affected === 0) {
      //   throw new Error("Cliente no encontrado");
      // }
      // return { success: true };
      
      // Opción 2: Cargar la entidad primero (permite lógica adicional)
      const producto = await productoRepository.findOne(
        {where: {codigo: id}}
      );
      if (!producto) {
        throw new Error("Cliente no encontrado");
      }
      
      await productoRepository.remove(producto);
      res.status(200).json({ success: true, message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  }

  export default deleteProducto;