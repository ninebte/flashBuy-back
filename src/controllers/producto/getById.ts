import AppDataSource from "../../../config/db";
import { Producto } from "../../entity/producto";
import { Request, Response } from "express";

async function getProductoById(req: Request, res: Response) {
  const productoRepository = AppDataSource.getRepository(Producto);
  const { id } = req.params;
  console.log("ID del producto:", id);

  // res.status(200).json({ message: "Producto encontrado" });

  try {
    const producto = await productoRepository.findOne(
      {where: {codigo: id}}
    );

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    res.status(200).json({data:producto,status:200});
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
}

export default getProductoById;