import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { CarritoProducto } from "./carritoproducto";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  codigo!: string;


  @Column("text")
  descripcion!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio!: number;

  @Column({ type:"integer", default: 0 })
  cantidad_almacen!: number;


  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.producto
  )
  carritoProductos!: CarritoProducto[];
}
