import AppDataSource from "../../../config/db";
import { CarritoProducto } from "../../entity/carritoproducto";
import { Request, Response } from "express";

async function updateCarritoProducto(req: Request, res: Response) {
  const carritoProductoRepository = AppDataSource.getRepository(CarritoProducto);
  const { id } = req.params;
  const { carrito_id, producto_codigo, cantidad, fecha_agregado } = req.body;
  const updateData= {
    carrito_id,producto_codigo,cantidad,fecha_agregado
  }
  try {
    // Primero verificamos que el cliente exista
    const carritoproducto = await carritoProductoRepository.findOne(
      {where: {carrito_id: +id}}
    );
    if (!carritoproducto) {
      throw new Error("Cp no encontrado");
    }
    // Actualizamos los campos proporcionados
    carritoProductoRepository.merge(carritoproducto, updateData);
    // Guardamos los cambios
    const updatedCarritoProducto = await carritoProductoRepository.save(carritoproducto);
    res.status(200).json(updatedCarritoProducto);
  } catch (error) {
      console.error("Error al obtener cp:", error);
    res.status(500).json({ error: "Error al obtener cp" });
  }
}

export default updateCarritoProducto;
