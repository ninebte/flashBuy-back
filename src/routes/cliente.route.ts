import { Router } from 'express';
import crearCliente from '../controllers/cliente/create';
import getAllClientes from '../controllers/cliente/getAll';
import getClienteById from '../controllers/cliente/getById';
import updateCliente from '../controllers/cliente/update';
import deleteCliente from '../controllers/cliente/delete';
import loginCliente from '../controllers/cliente/login'; // Cambiar a un controlador de login

const router = Router();

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/', crearCliente);
router.post('/login', loginCliente); // Cambiar a un controlador de login
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;