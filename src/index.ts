import express from 'express';
import cors from "cors";
import AppDataSource from '../config/db';
import homeRoute from './routes/home.route';
import clienteRoute from './routes/cliente.route';
import carritoRoute from './routes/carrito.route';
import productoRoute from './routes/producto.route';
import carritoProductoRoute from './routes/carritoProducto.route';

const app = express();
app.use(express.json());
app.use(cors());
AppDataSource.initialize().then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Error connecting to database:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/cliente', clienteRoute);
app.use('/carrito', carritoRoute);
app.use('/producto', productoRoute);
app.use('/carritoProducto', carritoProductoRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});