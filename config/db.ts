import { DataSource } from "typeorm";
import * as path from "path";
import { Cliente } from "../src/entity/cliente";
import { Producto } from "../src/entity/producto";
import { Carrito } from "../src/entity/carrito";
import { CarritoProducto } from "../src/entity/carritoproducto";
const dir="../src/entity";
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "flashbuy",
  synchronize: true,
  logging: false,
  entities: [Cliente,Producto,Carrito,CarritoProducto],
  migrations: [path.join(dir, "migrations/**/*{.ts,.js}")],
  subscribers: [path.join(dir, "**/*.subscriber{.ts,.js}")],
});

export default AppDataSource;