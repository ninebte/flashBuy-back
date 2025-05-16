import { Router } from 'express';
import crearProducto from '../controllers/producto/create';
import getAllProductos from '../controllers/producto/getAll';
import getProductoById from '../controllers/producto/getById';
import updateProducto from '../controllers/producto/update';
import deleteProducto from '../controllers/producto/delete';

const router = Router();

router.get('/', getAllProductos);
router.get('/:id', getProductoById);
router.post('/', crearProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;