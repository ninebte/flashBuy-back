import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Carrito } from "../../entity/carrito";

async function getAllCarritos(req: Request, res: Response) {
  const carritoRepository = AppDataSource.getRepository(Carrito);
  try {
    const carritos = await carritoRepository.find();
    res.status(200).json(carritos);
  } catch (error) {
    console.error("Error al obtener carritos:", error);
    res.status(500).json({ error: "Error al obtener carritos" });
  }
}

export default getAllCarritos;