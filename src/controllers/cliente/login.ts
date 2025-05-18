import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Cliente } from "../../entity/cliente";
import * as bcrypt from "bcrypt"; // Para el hash de contraseñas

async function loginCliente(req: Request, res: Response) {
  const clienteRepository = AppDataSource.getRepository(Cliente);
  const { email, contrasena } = req.body;
  //console.log("ID del cliente:", id);

  // res.status(200).json({ message: "Cliente encontrado" });

  try {
    const cliente = await clienteRepository.findOne({
      where: { email: email },
      // Opcional: cargar relaciones
      // relations: ["carritos"]
    });

    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    const compara = await bcrypt.compare(contrasena, cliente.contraseña);

    if (!compara) {
      throw new Error("Contraseña incorrecta");
    }

    // 5. Retornar el cliente creado (sin el hash de contraseña por seguridad)
    const { contraseña: _, ...clienteSinPassword } = cliente;
    res.status(200).json({data:clienteSinPassword,status:200});
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ error: "Error al obtener cliente" });
  }
}

export default loginCliente;