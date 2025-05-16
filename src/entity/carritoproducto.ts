import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Carrito } from "./carrito";
import { Producto } from "./producto";

@Entity()
export class CarritoProducto {
  @PrimaryColumn({ type: "integer" })
  carrito_id!: number;

  @PrimaryColumn({ type: "integer" })
  producto_codigo!: number;

  @Column({ type: "integer" })
  cantidad!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  fecha_agregado!: Date;

  @ManyToOne(() => Carrito, (carrito) => carrito.productos)
  carrito!: Carrito;

  @ManyToOne(() => Producto, (producto) => producto.carritoProductos)
  producto!: Producto;
}
