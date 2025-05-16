import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Carrito } from "./carrito";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn({type: "integer"})
  id!: number;

  @Column({type:"varchar",length:100})
  nombre!: string;

  @Column({type:"varchar",length:100})
  apellido!: string;

  @Column({type:"varchar",length:100})
  email!: string;

  @Column({type:"varchar",length:255})
  contraseña!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  fecha_registro!: Date;

  @OneToMany(() => Carrito, (carrito) => carrito.cliente)
  carritos!: Carrito[];
}
