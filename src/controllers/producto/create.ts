import AppDataSource from "../../../config/db";
import { Producto } from "../../entity/producto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

async function crearProducto(req: Request, res: Response) {
  const productoRepository = AppDataSource.getRepository(Producto);
  const { codigo, descripcion, precio, cantidad_almacen} = req.body;
  const productoData= {
    codigo,descripcion,precio,cantidad_almacen,fecha_creacion: new Date()
  }
  try {

    // 3. Crear nueva instancia del cliente
    const nuevoProducto = new Producto();
    nuevoProducto.codigo = productoData.codigo;
    nuevoProducto.descripcion = productoData.descripcion;
    nuevoProducto.precio = productoData.precio;
    nuevoProducto.cantidad_almacen = productoData.cantidad_almacen;
    nuevoProducto.fecha_creacion = productoData.fecha_creacion;
    // Los campos de fecha se llenan automáticamente por el DEFAULT en la entidad

    // 4. Guardar en la base de datos
    const productoCreado = await productoRepository.save(nuevoProducto);
    
    res.status(201).json(productoCreado);
    
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
}

export default crearProducto;