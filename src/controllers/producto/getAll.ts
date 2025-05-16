import AppDataSource from "../../../config/db";
import { Producto } from "../../entity/producto";
import { Request, Response } from "express";

async function getAllProductos(req: Request, res: Response) {
  const productoRepository = AppDataSource.getRepository(Producto);
  try {
    const productos = await productoRepository.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
}

export default getAllProductos;