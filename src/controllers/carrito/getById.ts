import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Carrito } from "../../entity/carrito";

async function getCarritoById(req: Request, res: Response) {
  const carritoRepository = AppDataSource.getRepository(Carrito);
  const { id } = req.params;
  console.log("ID del carrito:", id);

  // res.status(200).json({ message: "Carrito encontrado" });

  try {
    const carrito = await carritoRepository.findOne({
      where: { cliente_id: +id },
      // Opcional: cargar relaciones
      // relations: ["carritos"]
    });

    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    res.status(200).json(carrito);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ error: "Error al obtener carrito" });
  }
}

export default getCarritoById;