import { Router } from 'express';
import crearCarrito from '../controllers/carrito/create';
import getAllCarritos from '../controllers/carrito/getAll';
import getCarritoById from '../controllers/carrito/getById';
import updateCarrito from '../controllers/carrito/update';
import deleteCarrito from '../controllers/carrito/delete';

const router = Router();

router.get('/', getAllCarritos);
router.get('/:id', getCarritoById);
router.post('/', crearCarrito);
router.put('/:id', updateCarrito);
router.delete('/:id', deleteCarrito);        

export default router;