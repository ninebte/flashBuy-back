import AppDataSource from "../../../config/db";
import { Cliente } from "../../entity/cliente";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt"; // Para el hash de contraseñas

async function crearCliente(req: Request, res: Response) {

  const clienteRepository = AppDataSource.getRepository(Cliente);
  const { nombre, email, contrasena, apellido } = req.body;
  console.log("Datos del cliente:", req.body);
  const clienteData= {
    nombre,apellido,email,contrasena,fecha_registro: new Date()
  }
  
  try {
    // 1. Verificar si el email ya existe
    const existeCliente = await clienteRepository.findOne({ 
      where: { email: clienteData.email } 
    });
    
    if (existeCliente) {
      throw new Error("El email ya está registrado");
    }

    // 2. Crear hash de la contraseña (nunca guardar en texto plano)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(contrasena, salt);

    // 3. Crear nueva instancia del cliente
    const nuevoCliente = new Cliente();
    nuevoCliente.nombre = clienteData.nombre;
    nuevoCliente.apellido = clienteData.apellido;
    nuevoCliente.email = clienteData.email;
    nuevoCliente.contraseña = hashPassword;
    nuevoCliente.fecha_registro = clienteData.fecha_registro;
    // Los campos de fecha se llenan automáticamente por el DEFAULT en la entidad

    // 4. Guardar en la base de datos
    const clienteCreado = await clienteRepository.save(nuevoCliente);
    
    // 5. Retornar el cliente creado (sin el hash de contraseña por seguridad)
    const { contraseña: _, ...clienteSinPassword } = clienteCreado;
    res.status(201).json({data:clienteSinPassword,status:200});
    
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
}

export default crearCliente;