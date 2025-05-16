import AppDataSource from "../../../config/db";
import { Request, Response } from "express";
import { Cliente } from "../../entity/cliente";
async function updateCliente(req: Request, res: Response) {
    const clienteRepository = AppDataSource.getRepository(Cliente);
     const { id } = req.params;
    const { nombre, email,apellido } = req.body;
    const updateData= {
      nombre,email,apellido
    }
    
    try {
      // Primero verificamos que el cliente exista
      const cliente = await clienteRepository.findOne({ 
        where: { email: id } 
        
      });
      console.log(cliente);
      if (!cliente) {
        throw new Error("Cliente no encontrado");
      }
      
      // Actualizamos los campos proporcionados
      clienteRepository.merge(cliente, updateData);
      
      // Guardamos los cambios
      const updatedCliente = await clienteRepository.save(cliente);
      res.status(200).json(updatedCliente);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
      res.status(500).json({ error: "Error al obtener clientes" });
    }
  }

  export default updateCliente;