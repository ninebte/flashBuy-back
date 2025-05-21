import AppDataSource from "../../../config/db";
import { CarritoProducto } from "../../entity/carritoproducto";
import { Carrito } from "../../entity/carrito";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

async function crearCarritoProducto(req: Request, res: Response) {
  const carritoProductoRepository = AppDataSource.getRepository(CarritoProducto);
  const { carrito_id, producto_codigo, cantidad } = req.body;
  const carritoProductoData= {
    carrito_id,producto_codigo,cantidad,fecha_agregado: new Date()
  }
  
  try {
    

    // 2. Validar que el producto existe
    const producto = await carritoProductoRepository.findOne({
      where: { producto_codigo },
      relations: ["producto"]
    });

    if (!producto) {
      res.status(404).json({ error: "No existe producto" });
      return;
    }

    

    // 3. Crear nueva instancia del cliente
    const nuevocorritoProducto = new CarritoProducto();
    nuevocorritoProducto.carrito_id = carritoProductoData.carrito_id;
    nuevocorritoProducto.producto_codigo = carritoProductoData.producto_codigo;
    nuevocorritoProducto.cantidad = carritoProductoData.cantidad;
    nuevocorritoProducto.fecha_agregado = carritoProductoData.fecha_agregado;
    // Los campos de fecha se llenan automáticamente por el DEFAULT en la entidad

    // 4. Guardar en la base de datos
    const carritoProductoCreado = await carritoProductoRepository.save(nuevocorritoProducto);
    
    res.status(201).json(carritoProductoCreado);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
}

export default crearCarritoProducto;