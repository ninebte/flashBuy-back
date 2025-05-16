import AppDataSource from "../../../config/db";
import { Carrito } from "../../entity/carrito";
import { Request, Response } from "express";


async function updateCarrito(req: Request, res: Response) {
    const carritoRepository = AppDataSource.getRepository(Carrito);
    const { id } = req.params;
    const { cliente_id, activo, fecha_creacion } = req.body;
    const updateData= {
      cliente_id,activo,fecha_creacion
    }
    
    try {
      // Primero verificamos que el cliente exista
      const carrito = await carritoRepository.findOne(
        {where: {cliente_id: +id}}
      );
      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }
      
      // Actualizamos los campos proporcionados
      carritoRepository.merge(carrito, updateData);
      
      // Guardamos los cambios
      const updatedCarrito = await carritoRepository.save(carrito);
      res.status(200).json(updatedCarrito);
    } catch (error) {
        console.error("Error al obtener carrito:", error);
      res.status(500).json({ error: "Error al obtener carrito" });
    }
  }

  export default updateCarrito;