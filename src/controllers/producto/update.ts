import AppDataSource from "../../../config/db";
import { Producto } from "../../entity/producto";
import { Request, Response } from "express";

async function updateProducto(req: Request, res: Response) {
    const productoRepository = AppDataSource.getRepository(Producto);
    const { id } = req.params;
    const { codigo, descripcion, precio, cantidad_almacen, fecha_creacion } = req.body;
    const updateData= {
      codigo,descripcion,precio,cantidad_almacen,fecha_creacion
    }
    
    try {
      // Primero verificamos que el cliente exista
      const producto = await productoRepository.findOne(
        {where: {codigo: id}}
      );
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      
      // Actualizamos los campos proporcionados
      productoRepository.merge(producto, updateData);
      
      // Guardamos los cambios
      const updatedCliente = await productoRepository.save(producto);
      res.status(200).json(updatedCliente);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
      res.status(500).json({ error: "Error al obtener clientes" });
    }
  }

  export default updateProducto;