import { Router } from 'express';
import crearCarritoProducto from '../controllers/carritoproucto/create';
import getAllCarritoProductos from '../controllers/carritoproucto/getAll';
import getCarritoProductoById from '../controllers/carritoproucto/getById';
import updateCarritoProducto from '../controllers/carritoproucto/update';
import deleteCarritoProducto from '../controllers/carritoproucto/delete';
import payCarritoProducto from '../controllers/carritoproucto/pay';

const router = Router();

router.get('/', getAllCarritoProductos);
router.get('/:id', getCarritoProductoById);
router.post('/', crearCarritoProducto);
router.put('/:id', updateCarritoProducto);
router.delete('/:id', deleteCarritoProducto);
router.post('/', payCarritoProducto); )

export default router;