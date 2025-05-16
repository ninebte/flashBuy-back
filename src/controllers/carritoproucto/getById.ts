import AppDataSource from "../../../config/db";
import { CarritoProducto } from "../../entity/carritoproducto";
import { Request, Response } from "express";

async function getCarritoProductoById(req: Request, res: Response) {
  const carritoProductoRepository = AppDataSource.getRepository(CarritoProducto);
  const { id } = req.params;
  console.log("ID del carrito producto:", id);

  //res.status(200).json({ message: "Carrito producto encontrado" });

  try {
    const carritoproducto = await carritoProductoRepository.findOne(
      {where: {carrito_id: +id}}
    );

    if (!carritoproducto) {
      throw new Error("Cp no encontrado");
    }

    res.status(200).json(carritoproducto);
  } catch (error) {
    console.error("Error al obtener cp:", error);
    res.status(500).json({ error: "Error al obtener cp" });
  }
}

export default getCarritoProductoById;