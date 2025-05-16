import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Cliente } from "./cliente";

import { CarritoProducto } from "./carritoproducto";

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "integer", default: true })
  cliente_id!: number;

  @Column({ type: "boolean", default: true })
  activo!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.carritos)
  cliente!: Cliente;

  @OneToMany(
    () => CarritoProducto,
    (carritoProducto) => carritoProducto.carrito
  )
  productos!: CarritoProducto[];
}
