import AppDataSource from "../../../config/db";
import { CarritoProducto } from "../../entity/carritoproducto";
import { Request, Response } from "express";

async function getAllCarritoProductos(req: Request, res: Response) {
  const carritoProductoRepository = AppDataSource.getRepository(CarritoProducto);
  try {
    const carritoproducto = await carritoProductoRepository.find();
    res.status(200).json(carritoproducto);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
}

export default getAllCarritoProductos;