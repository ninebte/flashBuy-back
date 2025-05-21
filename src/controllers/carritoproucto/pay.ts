import AppDataSource from "../../../config/db";
import { CarritoProducto } from "../../entity/carritoproducto";
import { Carrito } from "../../entity/carrito";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

async function payCarritoProducto(req: Request, res: Response) {
  const carritoProductoRepository = AppDataSource.getRepository(CarritoProducto);
  const { carrito_id} = req.body;
  
  
  try {

    //Obtener productos del carrito
    const productos = await carritoProductoRepository.find({
      where: { carrito_id: +carrito_id },
      relations: ["producto"]
    });

    if (!productos) {
      res.status(404).json({ error: "No existe carrito" });
      return;
    }
    
    let precioTotal = 0;
    for (const producto of productos) { 
        //Sacar precio del producto
        precioTotal += producto.producto.precio * producto.cantidad;
    }

  } catch (error) {
    console.error("Error al obtener cp:", error);
    res.status(500).json({ error: "Error al obtener cp" });
  }
}

export default payCarritoProducto;