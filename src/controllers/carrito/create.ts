import AppDataSource from "../../../config/db";
import { Carrito } from "../../entity/carrito";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt"; // Para el hash de contraseñas

async function crearCarrito(req: Request, res: Response) {
  const carritoRepository = AppDataSource.getRepository(Carrito);
  const { cliente_id, activo } = req.body;
  const carritoData= {
    cliente_id,activo:activo==="true",fecha_creacion: new Date()
  }
  
  try {
    

    // 3. Crear nueva instancia del cliente
    const nuevoCarrito = new Carrito();
    nuevoCarrito.cliente_id = carritoData.cliente_id;
    nuevoCarrito.activo = carritoData.activo;
    nuevoCarrito.fecha_creacion = carritoData.fecha_creacion;
    // Los campos de fecha se llenan automáticamente por el DEFAULT en la entidad

    // 4. Guardar en la base de datos
    const carritoCreado = await carritoRepository.save(nuevoCarrito);
    
    res.status(201).json(carritoCreado);
    
  } catch (error) {
    console.error("Error al crear carrito:", error);
    res.status(500).json({ error: "Error al crear carrito" });
  }
}

export default crearCarrito;